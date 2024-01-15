import { Dependency } from "./Dependency.ts";

const depsRegistry = /https:\/\/deno\.land\/.*/;

interface ParseResult {
  deps: Dependency[];
  errors?: Error[];
}

/** Loads dependency list from a file */
export function parse(path: string): ParseResult {
  let t: string | null = null;

  // TODO: add file name and line number to output

  try {
    t = Deno.readTextFileSync(path);
  } catch (err) {
    return { deps: [], errors: [err] };
  }

  return t.split("\n")
    .filter((v) => /^(import|export)/.test(v))
    .filter((v) => depsRegistry.test(v))
    .map(parseImport)
    .reduce((acc, v) => {
      if (v instanceof Error) {
        if (!acc.errors) acc.errors = [];

        acc.errors.push(v);
      } else {
        acc.deps.push(v);
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
