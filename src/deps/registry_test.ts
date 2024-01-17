import { assert } from "../../deps.ts";
import { load } from "./mod.ts";

Deno.test({
  name: "registry",
  ignore: Deno.env.get("REGISTRY_URL") == null,
  async fn() {
    const dep = await load("std");

    assert.assertEquals(dep.name, "std");
    assert.assertMatch(dep.version, /\d+\.\d+\.\d+/);
  },
});
