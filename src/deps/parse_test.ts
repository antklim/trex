import { parse, parseImport } from "./parse.ts";
import { assert } from "../../deps.ts";

const testDepsFile = "./test/deps.ts";

Deno.test("parse dependencies file", () => {
  const result = parse(testDepsFile);

  assert.assertEquals(result, {
    deps: [
      { name: "std", version: "0.211.0" },
      { name: "std", version: "0.211.0" },
      { name: "oak", version: "v12.5.0" },
    ],
  });
});

// Deno.test("parse invalid dependencies file returns errors", () => {
//   const result = parse(testDepsFile);

//   assert.assertEquals(result, {
//     deps: [
//       { name: "std", version: "0.211.0" },
//       { name: "oak", version: "v12.6.2" },
//     ],
//     errors: [new Error("foo bar")],
//   });
// });

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
