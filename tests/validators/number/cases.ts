import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  0, 2.2, -1.2,
  '0', '2.1', '2', '-2',
  true, false
];

export const wrong: Array<any> = [
  NaN, Infinity,
  '', ' ', '-', 'abc',
  null, undefined,
  emptyObject(),
  emptyFunction(),
  emptyArray(),
  [1, 2, 3]
];