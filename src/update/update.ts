import type { DiffsByLocation } from "src/diff/mod.ts";
import { updateFile } from "src/update/updateFile.ts";

export async function update(depsDiff: DiffsByLocation) {
  const updates = Array.from(depsDiff.entries()).map(([file, diffs]) =>
    updateFile({ file, diffs })
  );

  await Promise.allSettled(updates);
}
