import { diff } from "./mod.ts";
import { assertEquals } from "@std/assert";

Deno.test("diff", () => {
  const localDeps = new Map()
    .set("std", [{
      name: "std",
      version: "0.211.0",
      referenceLine: 1,
      referenceLocation: "test/deps.ts",
    }, {
      name: "std",
      version: "0.211.0",
      referenceLine: 2,
      referenceLocation: "test/deps.ts",
    }])
    .set("oak", [
      {
        name: "oak",
        version: "v12.5.0",
        referenceLine: 4,
        referenceLocation: "test/deps.ts",
      },
    ]);

  const registryDeps = new Map()
    .set("std", { name: "std", version: "0.212.0" })
    .set("oak", { name: "oak", version: "v12.6.0" });

  const result = diff({ localDeps, registryDeps });

  const expected = new Map()
    .set("test/deps.ts", [
      {
        name: "std",
        newVersion: "0.212.0",
        oldVersion: "0.211.0",
        referenceLine: 1,
        referenceLocation: "test/deps.ts",
      },
      {
        name: "std",
        newVersion: "0.212.0",
        oldVersion: "0.211.0",
        referenceLine: 2,
        referenceLocation: "test/deps.ts",
      },
      {
        name: "oak",
        newVersion: "v12.6.0",
        oldVersion: "v12.5.0",
        referenceLine: 4,
        referenceLocation: "test/deps.ts",
      },
    ]);

  assertEquals(result, expected);
});
