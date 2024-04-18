import {
  assertEquals,
  assertInstanceOf,
  assertMatch,
  assertNotInstanceOf,
} from "@std/assert";
import { load, loadAll } from "src/deps/mod.ts";

Deno.test({
  name: "load",
  ignore: Deno.env.get("REGISTRY_URL") == null,
  async fn() {
    const dep = await load("std");
    assertNotInstanceOf(dep, Error);
    assertEquals(dep.name, "std");
    assertMatch(dep.version, /\d+\.\d+\.\d+/);
  },
});

Deno.test({
  name: "loadAll",
  ignore: Deno.env.get("REGISTRY_URL") == null,
  async fn() {
    const deps = await loadAll(["std", "oak"]);

    const std = deps.get("std")!;
    assertNotInstanceOf(std, Error);
    assertEquals(std.name, "std");
    assertMatch(std.version, /\d+\.\d+\.\d+/);

    const oak = deps.get("oak")!;
    assertNotInstanceOf(oak, Error);
    assertEquals(oak.name, "oak");
    assertMatch(oak.version, /v\d+\.\d+\.\d+/);
  },
});

Deno.test({
  name: "loadAll with error",
  ignore: Deno.env.get("REGISTRY_URL") == null,
  async fn() {
    const deps = await loadAll(["std", "oaksss"]);

    const std = deps.get("std")!;
    assertNotInstanceOf(std, Error);
    assertEquals(std.name, "std");
    assertMatch(std.version, /\d+\.\d+\.\d+/);

    const oaksss = deps.get("oaksss")!;
    assertInstanceOf(oaksss, Error);
    assertMatch(
      oaksss.message,
      /failed to load dependency info for oakss/,
    );
  },
});
