import { Dependency, DependencyReferenceInfo } from "../deps/mod.ts";
import { type Diff } from "./Diff.ts";

export * from "./Diff.ts";

interface DiffProps {
  localDeps: Map<string, DependencyReferenceInfo[]>;
  registryDeps: Map<string, Dependency>;
}

export function diff({ localDeps, registryDeps }: DiffProps): Diff[] {
  for (const [depName, referenceInfor] of localDeps) {
  }

  return [];
}
