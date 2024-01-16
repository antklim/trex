export interface DependencyCore {
  name: string;
  /// current version
  version: string;
}

// interface DependencyReference {
//   /// reference location - where the dependency is imported
//   referenceLocation: string;
//   /// reference line number
//   referenceLine: number;
// }

export interface Dependency extends DependencyCore {
  /// reference location - where the dependency is imported
  referenceLocation: string;
  /// reference line number
  referenceLine: number;
}

export interface DependencyInfo extends Dependency {
  latestVersion: string;
}
