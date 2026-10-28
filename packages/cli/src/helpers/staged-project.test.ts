import { expect, test } from "bun:test";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
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

test("a completed staged project replaces an empty target", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "chatjs-create-success-"));
  const target = path.join(root, "app");
  try {
    await mkdir(target);
    const result = await createStagedProject(target, async (stage) => {
      await writeFile(path.join(stage, "generated.txt"), "complete");
      return "ready";
    });
    expect(result).toBe("ready");
    expect(await readFile(path.join(target, "generated.txt"), "utf-8")).toBe(
      "complete"
    );
    expect(await readdir(root)).toEqual(["app"]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
