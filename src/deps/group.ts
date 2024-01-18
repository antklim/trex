import { DependencyReferenceInfo } from "./Dependency.ts";

export function group(
  deps: DependencyReferenceInfo[],
): Map<string, DependencyReferenceInfo[]> {
  return deps.reduce(
    (acc, dep) => {
      if (!acc.has(dep.name)) acc.set(dep.name, []);

      acc.get(dep.name)?.push(dep);

      return acc;
    },
    new Map() as Map<string, DependencyReferenceInfo[]>,
  );
}
