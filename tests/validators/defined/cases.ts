import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  1, 'abc', true, null,
  emptyObject(), emptyArray(), emptyFunction()
];

export const wrong: Array<any> = [
  undefined
];