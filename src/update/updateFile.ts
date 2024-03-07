import { type Diff } from "../diff/mod.ts";

export interface UpdateFileProps {
  file: string;
  diffs: Diff[];
}

export async function updateFile({ file, diffs }: UpdateFileProps) {
  console.log("\n🦕 Updating dependencies file:", file);
  console.log(diffs);
}
