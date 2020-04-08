import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  [[0], 0],
  [[0], -1],
  [[0], -Infinity],
  [['b'], 'b'],
  [['b'], 'a'],
  [[false], false],
  [[Date.now()], Date.now() - 1000],
  [[new Date()], new Date(Date.now() - 1000)]
];

export const wrong: Array<any> = [
  [[0], 1],
  [[0], Infinity],
  [[1], '1'],
  [[1], false],
  [[0], emptyObject()],
  [[0], emptyFunction()],
  [[0], emptyArray()],
  [[0], NaN],
  [[0], undefined],
  [['b'], 'c'],
  [['1'], 0],
  [['1'], false],
  [['0'], emptyObject()],
  [['0'], emptyFunction()],
  [['0'], emptyArray()],
  [['0'], NaN],
  [['0'], undefined],
  [[false], true],
  [[Date.now()], Date.now() + 1000],
  [[Date.now()], new Date(Date.now() + 1000)],
  [[new Date()], new Date(Date.now() + 1000)]
];

export const rightForNot: Array<any> = [
  [[0], 1],
  [[0], Infinity],
  [['b'], 'c'],
  [[false], true],
  [[Date.now()], Date.now() + 1000],
  [[new Date()], new Date(Date.now() + 1000)]
];

export const wrongForNot: Array<any> = [
  [[0], 0],
  [[0], -1],
  [[0], -Infinity],
  [['b'], 'b'],
  [['b'], 'a'],
  [[false], false],
  [[Date.now()], Date.now() - 1000],
  [[new Date()], new Date(Date.now() - 1000)],
  [[1], '1'],
  [[1], false],
  [[0], emptyObject()],
  [[0], emptyFunction()],
  [[0], emptyArray()],
  [[0], undefined],
  [[0], NaN],
  [['1'], 0],
  [['1'], false],
  [['0'], emptyObject()],
  [['0'], emptyFunction()],
  [['0'], emptyArray()],
  [['0'], NaN],
  [['0'], undefined],
  [[Date.now()], new Date(Date.now() + 1000)]
];