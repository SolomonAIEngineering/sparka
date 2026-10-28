import { expect, test } from "bun:test";
import { transformUiSource } from "../ui-source";

test("Base source and unrelated render APIs are preserved byte for byte", () => {
  const source = `import { Controller } from "react-hook-form";
import { MessageScrollerButton } from "@/components/ui/message-scroller";
const view = <><Controller render={({field}) => <input {...field} />} /><MessageScrollerButton render={<button />} /></>;`;
  expect(transformUiSource(source, "view.tsx", "radix")).toBe(source);
  expect(transformUiSource(source, "view.tsx", "base")).toBe(source);
});

test("Radix native slots preserve nested triggers, children, aliases and refs", () => {
  const source = `import { PopoverTrigger as Trigger } from "@/components/ui/popover";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
const view = <Trigger render={<DropdownMenuItem render={<a href='/share' />} ref={ref} />} nativeButton={false}>Share</Trigger>;`;
  const output = transformUiSource(source, "view.tsx", "radix");
  expect(output).toContain(
    "<Trigger asChild><DropdownMenuItem ref={ref} asChild><a href="
  );
  expect(output).toContain(">Share</a></DropdownMenuItem>");
  expect(output).not.toContain("nativeButton");
});

test.each(["{false}", "{true}", "{shouldClose}", "{condition ? false : true}"])(
  "menu dismissal requires explicit native source: %s",
  (value) => {
    const source = `import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
const item = <DropdownMenuItem closeOnClick=${value} onSelect={existingHandler} onClick={onShare}>Share</DropdownMenuItem>;`;
    expect(() => transformUiSource(source, "menu.tsx", "radix")).toThrow(
      "DropdownMenuItem.closeOnClick"
    );
  }
);

test("conditional and callback slots fail instead of losing fallback behavior", () => {
  for (const render of [
    "onEdit ? <button /> : undefined",
    "(props) => <button {...props} />",
  ]) {
    const source = `import { BubbleContent } from "@/components/ui/bubble"; const bubble = <BubbleContent render={${render}}><pre>{text}</pre></BubbleContent>;`;
    expect(() => transformUiSource(source, "bubble.tsx", "radix")).toThrow(
      "Unsupported native render composition"
    );
  }
});

test("readonly native checkboxes use ARIA without disabling their containing row", () => {
  const source = `import { Checkbox } from "@/components/ui/checkbox";
const checkbox = <Checkbox aria-hidden readOnly checked={selected} tabIndex={-1} />;`;
  const output = transformUiSource(source, "model-selector.tsx", "radix");
  expect(output).toContain("aria-readonly");
  expect(output).not.toContain("readOnly");
  expect(output).not.toContain("disabled");
});

test("Radix slots preserve prebuilt elements and native selectors without touching form render", () => {
  const source = `import { TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Controller } from "react-hook-form";
const view = <><TooltipTrigger render={button} /><DropdownMenuContent className="data-open:bg-muted w-[var(--anchor-width)]" /><Controller render={renderField} /></>;`;
  const output = transformUiSource(source, "view.tsx", "radix");
  expect(output).toContain("<TooltipTrigger asChild>{button}</TooltipTrigger>");
  expect(output).toContain(
    "data-[state=open]:bg-muted w-[var(--radix-dropdown-menu-trigger-width)]"
  );
  expect(output).toContain("<Controller render={renderField}/>");
});

test("hover timing requires native composition regardless of filename", () => {
  const source = `import { HoverCardTrigger } from "@/components/ui/hover-card"; const trigger = <HoverCardTrigger delay={0} render={<button />} />;`;
  for (const file of [
    "context.tsx",
    "components/ai-elements/context.tsx",
    "other.tsx",
  ]) {
    expect(() => transformUiSource(source, file, "radix")).toThrow(
      "HoverCardTrigger.delay"
    );
  }
});

test("Select with inline options retains its native children", () => {
  const source = `import { Select } from "@/components/ui/select"; const select = <Select items={{a: "A"}} value={value}>{options}</Select>;`;
  expect(transformUiSource(source, "select.tsx", "radix")).toContain(
    "<Select value={value}>{options}</Select>"
  );
});

test("native direction context follows the library API", () => {
  const source = `import { DirectionProvider } from "@/components/ui/direction";
const app = <DirectionProvider direction={rtl ? "rtl" : "ltr"}>{children}</DirectionProvider>;`;
  expect(transformUiSource(source, "app/layout.tsx", "radix")).toContain(
    'dir={rtl ? "rtl" : "ltr"}'
  );
  expect(transformUiSource(source, "app/layout.tsx", "base")).toBe(source);
});
