import { parse, parseImport } from "src/deps/mod.ts";
import { assertEquals } from "@std/assert";

Deno.test("parse dependencies file", () => {
  const testDepsFile = "./test/deps.ts";
  const result = parse(testDepsFile);

  assertEquals(result, {
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

  assertEquals(result.deps, [
    {
      name: "std",
      version: "0.211.0",
      referenceLine: 1,
      referenceLocation: testDepsFileWithError,
    },
  ]);

  assertEquals(
    result.errors?.at(0),
    new Error("invalid dependency name format: oak"),
  );
});

Deno.test("parseImport std registry url", () => {
  const result = parseImport(
    'export * as assert from "https://deno.land/std@0.211.0/assert/mod.ts";',
  );
  assertEquals(result, { name: "std", version: "0.211.0" });
});

Deno.test("parseImport x registry url", () => {
  const result = parseImport(
    'export * as assert from "https://deno.land/x/oak@v12.6.2/mod.ts";',
  );
  assertEquals(result, { name: "oak", version: "v12.6.2" });
});

Deno.test("parseImport unknown url format returns an error", () => {
  const result = parseImport(
    'export * as assert from "https://example.com";',
  );
  assertEquals(result, new Error("invalid dependency URL"));
});
