import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  0,
  1586024398667,
  '12.12.2020',
  [12, 12, 2020],
  new Date(1666000)
];

export const wrong: Array<any> = [
  null,
  'abc',
  undefined,
  NaN,
  Infinity,
  emptyArray(),
  emptyFunction(),
  emptyObject()
];