import { Dependency, DependencyReferenceInfo } from "./Dependency.ts";

const depsRegistry = /https:\/\/deno\.land\/.*/;

export interface ParseResult {
  deps: DependencyReferenceInfo[];
  errors?: Error[];
}

/** Loads dependency list from a file */
export function parse(path: string): ParseResult {
  let t: string | null = null;

  try {
    t = Deno.readTextFileSync(path);
  } catch (err) {
    return { deps: [], errors: [err] };
  }

  return t.split("\n")
    .reduce((acc, v, i) => {
      if (/^(import|export)/.test(v) && depsRegistry.test(v)) {
        acc.push([i + 1, v]);
      }

      return acc;
    }, [] as [number, string][])
    .map(([line, importStatement]) =>
      [line, parseImport(importStatement)] as [number, Dependency | Error]
    )
    .reduce((acc, [line, dep]) => {
      if (dep instanceof Error) {
        if (!acc.errors) acc.errors = [];

        acc.errors.push(dep);
      } else {
        acc.deps.push({ ...dep, referenceLine: line, referenceLocation: path });
      }

      return acc;
    }, { deps: [] } as ParseResult);
}

/** Parses import statement and returns dependency name and version */
export function parseImport(v: string): Dependency | Error {
  const match = v.match(depsRegistry);
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
