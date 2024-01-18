export interface Diff {
  /** file name where the dependency is imported */
  referenceLocation: string;
  /** reference line number */
  referenceLine: number;
  name: string;
  oldVersion: string;
  newVersion: string;
}
