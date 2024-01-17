import { DependencyReferenceInfo } from "./Dependency.ts";

export function group(
  deps: DependencyReferenceInfo[],
): Record<string, DependencyReferenceInfo[]> {
  return deps.reduce(
    (acc, dep) => {
      if (!acc[dep.name]) acc[dep.name] = [];

      acc[dep.name].push(dep);

      return acc;
    },
    {} as Record<string, DependencyReferenceInfo[]>,
  );
}
