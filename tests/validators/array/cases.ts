import { integer } from '@lib/base-api/extensions/validators/integer';
import { gte } from '@lib/base-api/validators/is';
import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const rightParams: Array<any> = [
  [],
  [0],
  [undefined],
  [null],
  [false],
  [emptyArray()],
  [emptyFunction()],
  [[emptyFunction()]],
  [[emptyFunction(), emptyFunction()]]
];

export const wrongParams: Array<any> = [
  [1],
  [[1]],
  ['1'],
  [['1']],
  [true],
  [[true]],
  [[false]],
  [emptyObject()],
  [[1, emptyFunction()]],
  [[emptyFunction(), emptyFunction(), null]],
  [[emptyFunction(), emptyFunction(), undefined]]
];

export const right: Array<any> = [
  [[null], []],
  [[undefined], []],
  [[false], []],
  [[], []],
  [[[]], []],
  [[], [1, 2]],
  [[], [null]],
  [[], [null, '2']],
  [[[integer()]], []],
  [[[integer()]], [1, 1]],
  [[[integer()]], [1, 1.2], [1, null]],
  [[[integer()]], [1, '1'], [1, null]],
  [[[integer()]], [false, '1'], [null, null]],
  [[[integer(), gte(0)]], []],
  [[[integer(), gte(0)]], [1, 1]],
  [[[integer(), gte(0)]], [1, -1], [1, null]],
  [[[integer(), gte(0)]], [NaN, -1], [null, null]],
  [[[integer(), gte(0)]], [Infinity, -Infinity], [null, null]],
  [[[integer(), gte(0)]], [10, 10.2], [10, null]]
];

export const wrong: Array<any> = [
  [[], 1],
  [[], 'abc'],
  [[], false],
  [[], null],
  [[], undefined],
  [[], emptyFunction()],
  [[], emptyObject()],
  [[[integer(), gte(0)]], false]
];

export const rightTemplate: Array<any> = [
  [],
  [1, 2],
  [null, '2']
];

export const wrongTemplate: Array<any> = [
  1,
  'abc',
  false,
  null,
  undefined,
  emptyFunction(),
  emptyObject()
];