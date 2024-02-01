import { cli } from "deps";
import { exec, options } from "./options/mod.ts";

export async function run() {
  const args = cli.parseArgs(Deno.args, {
    boolean: ["help", "version", "update"],
    alias: {
      file: ["f"],
      help: ["h"],
      update: ["u"],
      version: ["v"],
    },
    default: {
      file: "deps.ts",
      update: false,
    },
    unknown: (arg) => {
      console.error("❗Unknown option:", arg);
      Deno.exit(1);
    },
  });

  console.log("🦕 Deno Dependency Checker\n");

  if (args.help) {
    options.help.run();
    Deno.exit(0);
  }

  if (args.version) {
    options.version.run();
    Deno.exit(0);
  }

  const file = Deno.cwd() + "/deps.ts";

  await exec({ file, update: args.update });
}
