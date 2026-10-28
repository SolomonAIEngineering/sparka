import { expect, test } from "bun:test";
import {
  mkdtemp,
  mkdir,
  lstat,
  readFile,
  readdir,
  readlink,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createStagedProject } from "./staged-project";

// Native init can fail after it has already written components.json. Neither
// that partial state nor a later composition failure should occupy the target.
test.each(["native init", "composition install"])(
  "%s failure cleans only the owned stage",
  async (phase) => {
    const root = await mkdtemp(path.join(tmpdir(), "chatjs-create-failure-"));
    const target = path.join(root, "app");
    try {
      await mkdir(target);
      expect(
        createStagedProject(target, async (stage) => {
          await writeFile(path.join(stage, "components.json"), "{}");
          throw new Error(phase);
        })
      ).rejects.toThrow(phase);
      expect(await readdir(target)).toEqual([]);
      expect(await readdir(root)).toEqual(["app"]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
);

test("a target populated during creation is preserved", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "chatjs-create-race-"));
  const target = path.join(root, "app");
  try {
    expect(
      createStagedProject(target, async (stage) => {
        await writeFile(path.join(stage, "generated.txt"), "generated");
        await mkdir(target);
        await writeFile(path.join(target, "user.txt"), "keep");
      })
    ).rejects.toThrow("Target changed");
    expect(await readdir(target)).toEqual(["user.txt"]);
    expect(await readFile(path.join(target, "user.txt"), "utf-8")).toBe("keep");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("a completed staged project preserves an empty target directory", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "chatjs-create-success-"));
  const target = path.join(root, "app");
  try {
    await mkdir(target);
    const before = await lstat(target);
    const result = await createStagedProject(target, async (stage) => {
      await writeFile(path.join(stage, "generated.txt"), "complete");
      await mkdir(path.join(stage, "nested"));
      await writeFile(path.join(stage, "nested", ".config"), "config");
      await symlink("nested/.config", path.join(stage, "config-link"));
      return "ready";
    });
    expect(result).toBe("ready");
    const after = await lstat(target);
    expect(after.ino).toBe(before.ino);
    expect(await readFile(path.join(target, "generated.txt"), "utf-8")).toBe(
      "complete"
    );
    expect(await readdir(root)).toEqual(["app"]);
    expect(await readlink(path.join(target, "config-link"))).toBe(
      "nested/.config"
    );
    expect(await readFile(path.join(target, "config-link"), "utf-8")).toBe(
      "config"
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("creating in the current directory preserves relative file access", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "chatjs-create-cwd-"));
  const target = path.join(root, "app");
  try {
    await mkdir(target);
    const helper = new URL("staged-project.ts", import.meta.url).href;
    const child = Bun.spawn(
      [
        process.execPath,
        "--eval",
        `import { createStagedProject } from ${JSON.stringify(helper)};
         import { writeFile, readFile } from "node:fs/promises";
         import path from "node:path";
         await createStagedProject(".", async (stage) => {
           await writeFile(path.join(stage, "generated.txt"), "complete");
         });
         process.stdout.write(await readFile("generated.txt", "utf8"));`,
      ],
      { cwd: target, stdout: "pipe", stderr: "pipe" }
    );
    const output = await new Response(child.stdout).text();
    const errors = await new Response(child.stderr).text();
    expect(errors).toBe("");
    expect(await child.exited).toBe(0);
    expect(output).toBe("complete");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
