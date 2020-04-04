import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const rightParams: Array<any> = [
  [[0, 0]],
  [[0]],
  [[]],
  ['0123'],
  [[null, undefined, '']]
];

export const wrongParams: Array<any> = [
  [{}],
  [1],
  [NaN],
  [Infinity],
  [true],
  [null],
  [undefined]
];

export const right: Array<any> = [
  [[[1]], 1],
  [[[0, 1, 2]], 1],
  [['123'], 1],
  [['abc'], 'a'],
  [[['0', '1', '2']], '1'],
  [[[true, false]], true],
  [[[true, null]], null],
  [[[12, null, undefined]], undefined],
  [[[0, '1', true]], '1'],
  [[[0, '1', true]], 0],
  [[[0, emptyObject(), 0]], emptyObject()],
  [[[emptyArray(), 0, 0]], emptyArray()],
  [[[0, 0, emptyFunction()]], emptyFunction()]
];

export const wrong: Array<any> = [
  [[[1]], 0],
  [[[]], 1],
  [[[0, 1, 2]], 3],
  [['123'], 4],
  [['abc'], 'ac'],
  [[['0', '1', '2']], '03'],
  [[[true, false]], 'true'],
  [[[true, false]], 0],
  [[[0, '1', true]], false],
  [[[emptyArray(), 0, 0]], []],
  [[[0, emptyObject(), 0]], {}]
];