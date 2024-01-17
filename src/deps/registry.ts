import { Dependency } from "./Dependency.ts";
import { url } from "../../deps.ts";

const registryUrl = Deno.env.get("REGISTRY_URL") ?? "https://apiland.deno.dev";
const infoResource = Deno.env.get("INFO_RESOURCE") ?? "/v2/modules";

const _load = async (name: string): Promise<Dependency> => {
  const fetchUrl = url.join(registryUrl, infoResource, name);

  let dep: Dependency | null = null;
  let responseOk = false;
  let responseStatus = 0;
  let responseStatusText = "";

  {
    using client = Deno.createHttpClient({});

    const response = await fetch(fetchUrl, { client });

    responseOk = response.ok;
    responseStatus = response.status;
    responseStatusText = response.statusText;

    const body = await response.json();

    dep = {
      name: body.name,
      version: body.latest_version,
    };
  }

  if (!responseOk) {
    throw new Error(
      `failed to load dependency info for ${name}: ${responseStatus} ${responseStatusText}`,
    );
  }

  return dep;
};

/** Loads a dependency info from registry. */
export async function load(name: string): Promise<Dependency | Error> {
  try {
    return await _load(name);
  } catch (err) {
    return err;
  }
}

/** Loads all dependencies info from URLs. */
export async function loadAll(
  depNames: string[],
): Promise<Record<string, Dependency | Error>> {
  const result = await Promise.all(depNames.map(load));

  return depNames.reduce((acc, name, i) => {
    acc[name] = result[i];
    return acc;
  }, {} as Record<string, Dependency | Error>);
}
