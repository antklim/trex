export interface DependencyCore {
  name: string;
  /** current version */
  version: string;
}

interface DependencyReference {
  /** reference location - where the dependency is imported */
  referenceLocation: string;
  /** reference line number */
  referenceLine: number;
}

export type DependencyReferenceInfo = DependencyCore & DependencyReference;

interface DependencyRegistry {
  latestVersion: string;
}

export type DependencyRegistryInfo = DependencyCore & DependencyRegistry;

export type Dependency =
  & DependencyReferenceInfo
  & DependencyRegistryInfo;
