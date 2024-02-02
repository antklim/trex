import { commands, Options, parseArgs, Runnable } from "./commands/mod.ts";

export async function run() {
  const opts: Options = parseArgs(Deno.args);

  console.log("🦖 TRex - Deno Dependency Checker\n");

  const command: Runnable = opts.help
    ? commands.help
    : opts.version
    ? commands.version
    : commands.main;

  const code = await command.run(opts);

  Deno.exit(code);
}
