import { DependencyReferenceInfo } from "./Dependency.ts";

export function group(
  deps: DependencyReferenceInfo[],
): Map<string, DependencyReferenceInfo[]> {
  return Map.groupBy(deps, (dep) => dep.name);
}
