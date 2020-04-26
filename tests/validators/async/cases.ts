import { resolve, reject } from "@test/utilities";

export const cases: Array<any> = [
  [null, null],
  [10, 10],
  ['10', '10'],
  [resolve(10), 10],
  [reject(10), null]
];