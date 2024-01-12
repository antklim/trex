import { parseImport } from "./parse.ts";
import { assert } from "../../deps.ts";

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

Deno.test("parseImport unknown url format", () => {
  const result = parseImport(
    'export * as assert from "https://example.com";',
  );
  assert.assertEquals(result, new Error("Unknown URL format"));
});
