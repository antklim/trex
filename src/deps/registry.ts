import type { Dependency } from "./Dependency.ts";
import { url } from "deps";
import {
  defaultRegistryResponse,
  type RegistryResponse,
} from "./registry_response.ts";

const registryUrl = Deno.env.get("REGISTRY_URL") ?? "https://apiland.deno.dev";
const infoResource = Deno.env.get("INFO_RESOURCE") ?? "/v2/modules";

const _load = async (name: string): Promise<RegistryResponse> => {
  const fetchUrl = url.join(registryUrl, infoResource, name);

  const registryResponse = defaultRegistryResponse();

  {
    const r = await fetch(fetchUrl);

    registryResponse.response.ok = r.ok;
    registryResponse.response.status = r.status;
    registryResponse.response.statusText = r.statusText;

    const { name, latest_version } = await r.json();

    if (r.ok) {
      registryResponse.body = { name, latest_version };
    }
  }

  return registryResponse;
};

/** Loads a dependency info from registry. */
export async function load(name: string): Promise<Dependency | Error> {
  const { response, body } = await _load(name);

  if (!response.ok) {
    return new Error(
      `failed to load dependency info for ${name}: ${response.status} ${response.statusText}`,
    );
  }

  if (!body) {
    return new Error(`failed to load dependency info for ${name}`);
  }

  const dep: Dependency = { name: body.name, version: body.latest_version };

  return dep;
}

/** Loads all dependencies info from URLs. */
export async function loadAll(
  depNames: string[],
): Promise<Map<string, Dependency | Error>> {
  const result = await Promise.all(depNames.map(load));

  return depNames.reduce(
    (acc, name, i) => acc.set(name, result[i]),
    new Map<string, Dependency | Error>(),
  );
}
