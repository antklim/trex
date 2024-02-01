import help from "./help.ts";
import version from "./version.ts";

interface Command {
  run: () => void;
}

export type Option = "help" | "version";

export const options: Record<Option, Command> = {
  help,
  version,
};

export { exec } from "./exec.ts";
