import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  0, 2.2, -1.2, NaN, Infinity,
  '', '2', 'abc',
  true, false
];

export const wrong: Array<any> = [
  null, undefined,
  emptyObject(),
  emptyFunction(),
  emptyArray()
];