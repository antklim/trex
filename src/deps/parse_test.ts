import { parse, parseImport } from "./parse.ts";
import { assert } from "../../deps.ts";

Deno.test("parse dependencies file", () => {
  const testDepsFile = "./test/deps.ts";
  const result = parse(testDepsFile);

  assert.assertEquals(result, {
    deps: [
      {
        name: "std",
        version: "0.211.0",
        referenceLine: 1,
        referenceLocation: testDepsFile,
      },
      {
        name: "std",
        version: "0.211.0",
        referenceLine: 2,
        referenceLocation: testDepsFile,
      },
      {
        name: "oak",
        version: "v12.5.0",
        referenceLine: 4,
        referenceLocation: testDepsFile,
      },
    ],
  });
});

Deno.test("parse invalid dependencies file returns errors", () => {
  const testDepsFileWithError = "./test/depsWithError.ts";
  const result = parse(testDepsFileWithError);

  assert.assertEquals(result.deps, [
    {
      name: "std",
      version: "0.211.0",
      referenceLine: 1,
      referenceLocation: testDepsFileWithError,
    },
  ]);

  assert.assertEquals(
    result.errors?.at(0),
    new Error("invalid dependency name format: oak"),
  );
});

Deno.test("parseImport std registry url", () => {
  const result = parseImport(
    'export * as assert from "https://deno.land/std@0.211.0/assert/mod.ts";',
  );
  assert.assertEquals(result, { name: "std", version: "0.211.0" });
});

Deno.test("parseImport x registry url", () => {
  const result = parseImport(
    'export * as assert from "https://deno.land/x/oak@v12.6.2/mod.ts";',
  );
  assert.assertEquals(result, { name: "oak", version: "v12.6.2" });
});

Deno.test("parseImport unknown url format returns an error", () => {
  const result = parseImport(
    'export * as assert from "https://example.com";',
  );
  assert.assertEquals(result, new Error("invalid dependency URL"));
});
