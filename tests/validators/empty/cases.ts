import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  null, undefined, ''
];

export const wrong: Array<any> = [
  1, true, 'abc', Infinity,
  emptyArray(), emptyFunction(), emptyObject()
];