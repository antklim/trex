import { parseArgs as cliParseArgs } from "@std/cli";
import type { Options } from "./types.ts";

export function parseArgs(args: string[]): Options {
  return cliParseArgs(args, {
    boolean: ["help", "version", "update"],
    string: ["file"],
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
}
