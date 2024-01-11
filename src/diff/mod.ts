import { Dependency } from "../deps/mod.ts";
import { type Diff } from "./Diff.ts";

export * from "./Diff.ts";

export const diff = (deps: Dependency[]): Diff[] => {
  return [];
};
