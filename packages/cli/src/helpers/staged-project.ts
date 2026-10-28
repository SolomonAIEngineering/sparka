import { lstat, mkdir, mkdtemp, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";

// Only the owned stage is disposable. Finalization never removes a user's path.
export const createStagedProject = async <T>(
  target: string,
  create: (stage: string) => Promise<T>
): Promise<T> => {
  const destination = path.resolve(target);
  await mkdir(path.dirname(destination), { recursive: true });
  const root = await mkdtemp(
    path.join(
      path.dirname(destination),
      `.${path.basename(destination)}-chatjs-`
    )
  );
  const stage = path.join(root, "app");
  await mkdir(stage);
  try {
    const result = await create(stage);
    const existing = await lstat(destination).catch((error: unknown) => {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return;
      }
      throw error;
    });
    const entries =
      existing?.isDirectory() === true ? await readdir(destination) : [];
    if (
      existing &&
      (!existing.isDirectory() ||
        existing.isSymbolicLink() ||
        entries.length > 0)
    ) {
      throw new Error(
        `Target changed during creation: ${destination}. No existing files were replaced.`
      );
    }
    await rename(stage, destination);
    return result;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
};
