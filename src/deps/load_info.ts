import { Dependency } from "./Dependency.ts";

/**
 * Loads a dependency info from a URL.
 */
export const loadInfo = async (url: string): Promise<Dependency> => {
  {
    using client = Deno.createHttpClient({});
    const response = await fetch(url, { client });

    const t = await response.text();

    console.log(t);
  }

  return {} as Dependency;
};
