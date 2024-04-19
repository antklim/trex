let version = "0.0.0";

const decoder = new TextDecoder();

for await (const chunk of Deno.stdin.readable) {
  version = decoder.decode(chunk).trimEnd();
}

console.log(`export const version = "${version}";`);
