import { gte } from '@lib/base-api/validators/is';
import { integer } from '@lib/base-api/validators/multiple';
import { number } from '@lib/base-api/validators/number';
import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const rightParams: Array<any> = [
  [],
  [emptyFunction()],
  [emptyFunction(), emptyFunction()]
];

export const wrongParams: Array<any> = [
  [emptyObject()],
  [emptyArray()],
  [1],
  ['1'],
  [false],
  [Infinity],
  [NaN],
  [null],
  [undefined]
];

export const right: Array<any> = [
  [[number()], 0],
  [[number()], '1', 1],
  [[number(), integer(), gte(0)], '1', 1]
];

export const wrong: Array<any> = [
  [[number()], 'abc'],
  [[number()], 'abc'],
  [[number(), integer(), gte(0)], 1.2],
  [[number(), integer(), gte(0)], -1],
  [[number(), integer(), gte(0)], 'abc']
];