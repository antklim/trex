import { Dependency } from "../deps/index.ts";
import { type Diff } from "./Diff.ts";

export * from "./Diff.ts";

export const diff = (deps: Dependency[]): Diff[] => {
  return [];
};
