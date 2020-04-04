import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const rightParams: Array<any> = [
  [emptyFunction()]
];

export const wrongParams: Array<any> = [
  [1],
  ['12'],
  [true],
  [emptyArray()],
  [emptyObject()]
];

export const right: Array<any> = [
  0, '10'
];

export const wrong: Array<any> = [
  1, '1', null, undefined
];