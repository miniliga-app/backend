export const mergeUnique = <T>(...arrays: T[][]): T[] => [
  ...new Set(arrays.flat()),
];
