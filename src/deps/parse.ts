import { Dependency } from "./Dependency.ts";

/**
 * Loads dependency list from a file.
 */
export const parse = (path: string): Dependency[] => {
  return [];
};

/** Parses import statement and returns dependency name and version */
export const parseImport = (v: string): Dependency => {
  return { name: "", version: "" };
};
