import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const right: Array<any> = [
  [[0], 0],
  [[0], 1],
  [[0], Infinity],
  [['b'], 'b'],
  [['b'], 'c'],
  [[true], true],
  [[Date.now()], Date.now() + 1000],
  [[new Date()], new Date(Date.now() + 1000)]
];

export const wrong: Array<any> = [
  [[0], -1],
  [[0], -Infinity],
  [[0], '1'],
  [[0], true],
  [[0], emptyObject()],
  [[0], emptyFunction()],
  [[0], emptyArray()],
  [[0], NaN],
  [[0], undefined],
  [['b'], 'a'],
  [['0'], 10],
  [['0'], true],
  [['0'], emptyObject()],
  [['0'], emptyFunction()],
  [['0'], emptyArray()],
  [['0'], NaN],
  [['0'], undefined],
  [[true], false],
  [[Date.now()], Date.now() - 1000],
  [[Date.now()], new Date(Date.now() - 1000)],
  [[new Date()], new Date(Date.now() - 1000)]
];

export const rightForNot: Array<any> = [
  [[0], -1],
  [['b'], 'a'],
  [[true], false],
  [[Date.now()], Date.now() - 1000],
  [[new Date()], new Date(Date.now() - 1000)],
  [[0], -Infinity],
];

export const wrongForNot: Array<any> = [
  [[0], 0],
  [[0], 1],
  [[0], Infinity],
  [['b'], 'b'],
  [['b'], 'c'],
  [[true], true],
  [[Date.now()], Date.now() + 1000],
  [[new Date()], new Date(Date.now() + 1000)],
  [[0], '1'],
  [[0], true],
  [[0], emptyObject()],
  [[0], emptyFunction()],
  [[0], emptyArray()],
  [[0], undefined],
  [[0], NaN],
  [['0'], 10],
  [['0'], true],
  [['0'], emptyObject()],
  [['0'], emptyFunction()],
  [['0'], emptyArray()],
  [['0'], NaN],
  [['0'], undefined],
  [[Date.now()], new Date(Date.now() - 1000)]
];