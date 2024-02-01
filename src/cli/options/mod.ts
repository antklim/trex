import help from "./help.ts";
import version from "./version.ts";

interface Command {
  run: () => void;
}

export type Option = "help" | "version"; //| "file" | "update";

export const options: Record<Option, Command> = {
  help,
  version,
};
