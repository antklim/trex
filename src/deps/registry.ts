import { Dependency } from "./Dependency.ts";
import { url } from "../../deps.ts";

const registryUrl = Deno.env.get("REGISTRY_URL") ?? "https://apiland.deno.dev";
const infoResource = Deno.env.get("INFO_RESOURCE") ?? "/v2/modules";

/**
 * Loads a dependency info from registry.
 * Throws an error if the dependency info cannot be loaded.
 */
export async function load(name: string): Promise<Dependency> {
  let dep: Dependency | null = null;

  {
    using client = Deno.createHttpClient({});
    const fetchUrl = url.join(registryUrl, infoResource, name);
    const response = await fetch(fetchUrl, { client });

    const body = await response.json();

    dep = { name: body.name, version: body.latest_version };
  }

  if (dep == null) throw new Error(`filed to load dependency info for ${name}`);

  return dep;
}

/** Loads all dependencies info from URLs. */
export async function loadAll(
  depNames: string[],
): Promise<Record<string, Dependency | Error>> {
  const promises = depNames.map((name) => load(name).catch((err) => err));

  const result = await Promise.all(promises);

  return depNames.reduce((acc, name, i) => {
    acc[name] = result[i];
    return acc;
  }, {} as Record<string, Dependency | Error>);
}
