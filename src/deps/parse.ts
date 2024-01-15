import { Dependency } from "./Dependency.ts";

/**
 * Loads dependency list from a file.
 */
export function parse(_path: string): Dependency[] {
  return [];
}

/** Parses import statement and returns dependency name and version */
export function parseImport(v: string): Dependency | Error {
  const match = v.match(/https:\/\/deno\.land\/.*/);
  if (!match) return new Error("dependency URL not found");

  const s = match.at(0)?.replace(/https:\/\/deno\.land\//, "").split("/");
  if (!s) return new Error("invalid dependency URL not found");

  const depName = s.at(0) === "x" ? s.at(1) : s.at(0);
  if (!depName) return new Error("dependency name not identified");

  const [name, version] = depName.split("@");
  if (!name || !version) {
    return new Error(`invalid dependency name format: ${depName}`);
  }

  return { name, version };
}
