import { Dependency } from "./Dependency.ts";

/**
 * Loads dependency list from a file.
 */
export function parse(path: string): Dependency[] {
  return [];
}

/** Parses import statement and returns dependency name and version */
export function parseImport(v: string): Dependency | Error {
  return { name: "", version: "" };
}
