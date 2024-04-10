import type { DependencyReferenceInfo } from "./mod.ts";
import { group } from "./group.ts";
import { assertEquals } from "@std/assert";

Deno.test("group", () => {
  const deps: DependencyReferenceInfo[] = [
    {
      name: "std",
      version: "0.211.0",
      referenceLine: 1,
      referenceLocation: "test/deps.ts",
    },
    {
      name: "std",
      version: "0.211.0",
      referenceLine: 2,
      referenceLocation: "test/deps.ts",
    },
    {
      name: "oak",
      version: "v12.5.0",
      referenceLine: 4,
      referenceLocation: "test/deps.ts",
    },
  ];

  const result = group(deps);

  const expected = new Map()
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

  assertEquals(result, expected);
});
