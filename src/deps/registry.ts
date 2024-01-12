import { Dependency } from "./Dependency.ts";
import { url } from "../../deps.ts";

// TODO: this should be configurable
const registryUrl = "apiland.deno.dev";
const infoResource = "/v2/modules";

/**
 * Loads a dependency info from a URL.
 */
export async function load(name: string): Promise<Dependency> {
  {
    using client = Deno.createHttpClient({});
    const fetchUrl = url.join(registryUrl, infoResource, name);
    const response = await fetch(fetchUrl, { client });

    const t = await response.text();

    console.log(t);
  }

  return {} as Dependency;
}

/**
 * Loads all dependencies info from URLs.
 */
export function loadAll(urls: string[]): Promise<Dependency[]> {
  return Promise.all(urls.map(load));
}
