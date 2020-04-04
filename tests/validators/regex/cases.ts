import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const rightParams: Array<any> = [
  [/1/],
  [/a/],
  [new RegExp('a')]
];

export const wrongParams: Array<any> = [
  [1],
  [-1],
  [NaN],
  [Infinity],
  ['1'],
  [true],
  [emptyObject()],
  [emptyArray()],
  [emptyFunction()],
  [null],
  [undefined]
];

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