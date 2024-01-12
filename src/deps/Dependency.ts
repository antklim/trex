export interface Dependency {
  name: string;
  /// current version
  version: string;
}

export interface DependencyInfo extends Dependency {
  latest_version: string;
}
