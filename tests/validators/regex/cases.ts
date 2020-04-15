import { emptyFunction } from '@test/utilities';

export const right: Array<any> = [
  1, true, 'a'
];

export const wrong: Array<any> = [
  0, 11, Infinity, NaN,
  'abc',
  false,
  {},
  emptyFunction(),
  [],
  null, undefined
];