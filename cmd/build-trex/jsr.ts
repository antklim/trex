import deno from "../../deno.json" with { type: "json" };

let version = "0.0.0";

const decoder = new TextDecoder();

for await (const chunk of Deno.stdin.readable) {
  version = decoder.decode(chunk).trimEnd();
}

const jsr = {
  name: deno.name,
  version,
  exports: deno.exports,
  publish: deno.publish,
  imports: deno.imports,
};

console.log(JSON.stringify(jsr, null, 2));
