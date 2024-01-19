/**
 * CLI entry point
 *
 * Options:
 * -h, --help     Show help
 * -v, --version  Show version number
 * -f, --file     Dependency file to read and update (string [default: "deps.ts"])
 * -u, --update   Update dependencies in file (default: false)
 */

import { Dependency, group, loadAll, parse } from "../deps/mod.ts";
import { diff } from "../diff/mod.ts";

export async function run() {
  const file = Deno.cwd() + "/deps.ts";
  const deps = parse(file);

  if (deps.errors) {
    console.error("Errors found:");
    deps.errors.forEach((err) => console.error(err));
    Deno.exit(1);
  }

  const uniqueDeps = group(deps.deps);
  console.log("Dependencies found:");
  console.log(uniqueDeps);

  console.log("Loading dependencies info from registry...");

  const registryDeps = await loadAll([...uniqueDeps.keys()]);

  console.log("Dependencies loaded:");
  console.log(registryDeps);

  const loadedDeps = new Map<string, Dependency>();

  for (const [name, dep] of registryDeps) {
    if (dep instanceof Error) continue;
    loadedDeps.set(name, dep);
  }

  const depsDiff = diff({ localDeps: uniqueDeps, registryDeps: loadedDeps });
  console.log("Differences found:");
  console.log(depsDiff);

  Deno.exit(0);
}
