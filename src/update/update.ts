import type { DiffsByLocation } from "../diff/mod.ts";
import { updateFile } from "./updateFile.ts";

export async function update(depsDiff: DiffsByLocation) {
  const updates = Array.from(depsDiff.entries()).map(([file, diffs]) =>
    updateFile({ file, diffs })
  );

  const result = await Promise.allSettled(updates);
  console.log(result);
}
