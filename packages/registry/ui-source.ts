import ts from "typescript";

const nativeUiImport = /(?:^|\/)components\/ui\/(?<component>[^/]+)$/u;
const radixAttributeNames = new Map([
  ["Checkbox.readOnly", "aria-readonly"],
  ["DirectionProvider.direction", "dir"],
]);
/** Emit maintained ChatJS compositions using the selected shadcn native API. */
export const transformUiSource = (
  source: string,
  fileName: string,
  base: "base" | "radix"
): string => {
  if (base === "base") {
    return source;
  }
  const file = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const imports = new Map<string, string>();
  for (const statement of file.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      continue;
    }
    const moduleName = nativeUiImport.exec(statement.moduleSpecifier.text)
      ?.groups?.component;
    // @shadcn/react exposes render for either primitive library.
    if (
      moduleName === undefined ||
      moduleName === "message-scroller" ||
      moduleName === "questionnaire"
    ) {
      continue;
    }
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const binding of bindings.elements) {
        imports.set(
          binding.name.text,
          (binding.propertyName ?? binding.name).text
        );
      }
    }
  }
  if (imports.size === 0) {
    return source;
  }
  let changed = false;
  const transformed = ts.transform(file, [
    (context) => {
      const { factory } = context;
      const withChildren = (
        element: ts.JsxElement,
        children: readonly ts.JsxChild[]
      ): ts.JsxElement => {
        const slot = element.openingElement.attributes.properties.some(
          (attribute) =>
            ts.isJsxAttribute(attribute) &&
            ts.isIdentifier(attribute.name) &&
            attribute.name.text === "asChild"
        );
        const meaningful = element.children.filter(
          (child) => !ts.isJsxText(child) || child.text.trim() !== ""
        );
        const [only] = meaningful;
        return factory.updateJsxElement(
          element,
          element.openingElement,
          slot &&
            meaningful.length === 1 &&
            only !== undefined &&
            ts.isJsxElement(only)
            ? [withChildren(only, children)]
            : children,
          element.closingElement
        );
      };
      const renderChild = (
        expression: ts.Expression,
        children: readonly ts.JsxChild[],
        component: string
      ): ts.JsxChild => {
        if (ts.isParenthesizedExpression(expression)) {
          return renderChild(expression.expression, children, component);
        }
        if (ts.isJsxSelfClosingElement(expression)) {
          return factory.createJsxElement(
            factory.createJsxOpeningElement(
              expression.tagName,
              expression.typeArguments,
              expression.attributes
            ),
            children,
            factory.createJsxClosingElement(expression.tagName)
          );
        }
        const hasChildren = children.some(
          (child) => !ts.isJsxText(child) || child.text.trim() !== ""
        );
        if (ts.isJsxElement(expression)) {
          return hasChildren ? withChildren(expression, children) : expression;
        }
        if (
          !hasChildren &&
          !ts.isArrowFunction(expression) &&
          !ts.isFunctionExpression(expression) &&
          !ts.isConditionalExpression(expression)
        ) {
          return factory.createJsxExpression(undefined, expression);
        }
        throw new Error(
          `Unsupported native render composition in ${fileName}: ${component}`
        );
      };
      const visit: ts.Visitor = (node) => {
        const visited = ts.visitEachChild(node, visit, context);
        if (!ts.isJsxElement(visited) && !ts.isJsxSelfClosingElement(visited)) {
          return visited;
        }
        const opening = ts.isJsxElement(visited)
          ? visited.openingElement
          : visited;
        const component = ts.isIdentifier(opening.tagName)
          ? imports.get(opening.tagName.text)
          : undefined;
        if (component === undefined) {
          return visited;
        }
        let render: ts.Expression | undefined;
        const properties: ts.JsxAttributeLike[] = [];
        const classVisitor: ts.Visitor = (child) => {
          if (
            ts.isStringLiteral(child) ||
            ts.isNoSubstitutionTemplateLiteral(child)
          ) {
            const text = child.text
              .replaceAll("data-open:", "data-[state=open]:")
              .replaceAll("data-closed:", "data-[state=closed]:")
              .replaceAll(
                "--anchor-width",
                component === "DropdownMenuContent"
                  ? "--radix-dropdown-menu-trigger-width"
                  : "--anchor-width"
              );
            if (text !== child.text) {
              changed = true;
              return factory.createStringLiteral(text);
            }
          }
          return ts.visitEachChild(child, classVisitor, context);
        };
        const transformAttribute = (attribute: ts.JsxAttributeLike): void => {
          if (
            !ts.isJsxAttribute(attribute) ||
            !ts.isIdentifier(attribute.name)
          ) {
            properties.push(attribute);
            return;
          }
          const name = attribute.name.text;
          const { initializer } = attribute;
          const renamed = radixAttributeNames.get(`${component}.${name}`);
          if (renamed !== undefined) {
            properties.push(
              factory.updateJsxAttribute(
                attribute,
                factory.createIdentifier(renamed),
                initializer
              )
            );
            changed = true;
            return;
          }
          if (
            name === "render" &&
            initializer !== undefined &&
            ts.isJsxExpression(initializer)
          ) {
            render = initializer.expression;
            changed = true;
            return;
          }
          if (
            name === "nativeButton" ||
            (name === "items" && component === "Select")
          ) {
            changed = true;
            return;
          }
          if (
            (name === "closeOnClick" && component.startsWith("DropdownMenu")) ||
            (component === "HoverCardTrigger" &&
              ["delay", "closeDelay"].includes(name))
          ) {
            throw new Error(
              `Unsupported native behavior in ${fileName}: ${component}.${name}. Declare an explicit native implementation.`
            );
          }
          if (name === "className") {
            properties.push(
              ts.visitNode(attribute, classVisitor, ts.isJsxAttribute) ??
                attribute
            );
          } else {
            properties.push(attribute);
          }
        };
        for (const attribute of opening.attributes.properties) {
          transformAttribute(attribute);
        }
        const children = ts.isJsxElement(visited) ? [...visited.children] : [];
        if (render) {
          properties.push(
            factory.createJsxAttribute(
              factory.createIdentifier("asChild"),
              // oxlint-disable-next-line unicorn/no-useless-undefined -- TypeScript requires the initializer argument for a boolean JSX attribute.
              undefined
            )
          );
          const child = renderChild(render, children, component);
          return factory.createJsxElement(
            factory.createJsxOpeningElement(
              opening.tagName,
              opening.typeArguments,
              factory.createJsxAttributes(properties)
            ),
            [child],
            factory.createJsxClosingElement(opening.tagName)
          );
        }
        const attributes = factory.createJsxAttributes(properties);
        return ts.isJsxElement(visited)
          ? factory.updateJsxElement(
              visited,
              factory.updateJsxOpeningElement(
                visited.openingElement,
                opening.tagName,
                opening.typeArguments,
                attributes
              ),
              visited.children,
              visited.closingElement
            )
          : factory.updateJsxSelfClosingElement(
              visited,
              visited.tagName,
              visited.typeArguments,
              attributes
            );
      };
      return (root) => ts.visitNode(root, visit, ts.isSourceFile) ?? root;
    },
  ]);
  try {
    const [output] = transformed.transformed;
    return changed && output !== undefined
      ? ts.createPrinter().printFile(output)
      : source;
  } finally {
    transformed.dispose();
  }
};
