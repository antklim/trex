const version = Deno.env.get("TREX_VERSION") ?? "0.0.0";

console.log(`export const version = "${version}";`);
