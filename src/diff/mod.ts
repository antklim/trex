import { Dependency } from "../deps/mod.ts";
import { type Diff } from "./Diff.ts";

export * from "./Diff.ts";

export function diff(_deps: Dependency[]): Diff[] {
  return [];
}
