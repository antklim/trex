export type DependencyName = string;

export interface Dependency {
  name: string;
  version: string;
}

interface DependencyReference {
  /** file name where the dependency is imported */
  referenceLocation: string;
  /** reference line number */
  referenceLine: number;
}

export type DependencyReferenceInfo = Dependency & DependencyReference;
