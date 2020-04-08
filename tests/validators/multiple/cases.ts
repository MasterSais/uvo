import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  [[1], 1, 1],
  [[2], 2, 2]
];

export const wrong: Array<any> = [
  [[1], 1.2],
  [[2], 3],
  [[2], '2'],
  [[2], false],
  [[2], null],
  [[2], Infinity],
  [[2], -Infinity],
  [[2], NaN],
  [[2], undefined],
  [[2], emptyFunction()],
  [[2], emptyArray()],
  [[2], emptyObject()]
];

export const rightForNot: Array<any> = [
  [[1], 1.2],
  [[2], 3],
  [[2], Infinity],
  [[2], -Infinity],
  [[2], NaN]
];

export const wrongForNot: Array<any> = [
  [[1], 1, 1],
  [[2], 2, 2],
  [[2], '2'],
  [[2], false],
  [[2], null],
  [[2], undefined],
  [[2], emptyFunction()],
  [[2], emptyArray()],
  [[2], emptyObject()]
];