export interface Diff {
  name: string;
  newVersion: string;
  oldVersion: string;
  /** reference line number */
  referenceLine: number;
  /** file name where the dependency is imported */
  referenceLocation: string;
}
