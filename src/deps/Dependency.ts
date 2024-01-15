// TODO: add deps file name and line number

export interface Dependency {
  name: string;
  /// current version
  version: string;
}

export interface DependencyInfo extends Dependency {
  latest_version: string;
}
