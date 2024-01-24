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
    console.error("❗Failed to parse dependencies file:");
    deps.errors.forEach((err) => console.error(err));
    Deno.exit(1);
  }

  const uniqueDeps = group(deps.deps);
  if (!uniqueDeps.size) {
    console.error("✅ No dependencies found in file:", file);
    Deno.exit(1);
  }

  console.log("✅ Dependencies found:");
  console.log([...uniqueDeps.keys()], "\n");

  console.log("🦖 Loading dependencies info from registry...\n");

  const registryDeps = await loadAll([...uniqueDeps.keys()]);

  console.log("✅ Dependencies loaded:");
  console.log([...registryDeps.keys()], "\n");

  const loadedDeps = new Map<string, Dependency>();

  for (const [name, dep] of registryDeps) {
    if (dep instanceof Error) {
      console.error("❗Error loading dependency:", name, dep.message);
      continue;
    }
    loadedDeps.set(name, dep);
  }

  if (!loadedDeps.size) {
    console.error("❗No dependencies loaded");
    Deno.exit(1);
  }

  const depsDiff = diff({ localDeps: uniqueDeps, registryDeps: loadedDeps });
  if (!depsDiff.size) {
    console.log("🦕 All dependencies are up to date");
    Deno.exit(0);
  }

  console.log("✅ Differences found:");
  console.log(depsDiff);

  Deno.exit(0);
}
