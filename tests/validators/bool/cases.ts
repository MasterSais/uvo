import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  true,
  false,
  1,
  0,
  'true',
  'false',
  '1',
  '0'
];

export const wrong: Array<any> = [
  null,
  '10.2',
  '-10.2',
  undefined,
  NaN,
  Infinity,
  emptyArray(),
  [1, 2, 3],
  emptyFunction(),
  emptyObject()
];