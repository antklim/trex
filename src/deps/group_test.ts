import { DependencyReferenceInfo } from "./mod.ts";
import { group } from "./group.ts";
import { assert } from "../../deps.ts";

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

  assert.assertEquals(result, {
    std: [
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
    ],
    oak: [
      {
        name: "oak",
        version: "v12.5.0",
        referenceLine: 4,
        referenceLocation: "test/deps.ts",
      },
    ],
  });
});
