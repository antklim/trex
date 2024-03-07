export interface Diff {
  name: string;
  newVersion: string;
  oldVersion: string;
  /** reference line number */
  referenceLine: number;
  /** file location where the dependency is imported */
  referenceLocation: string;
}

/** Maps file location to diffs */
export type DiffsByLocation = Map<string, Diff[]>;
