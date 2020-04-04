import { emptyObject } from '@test/utilities';

export const right: Array<any> = [
  [[1], 1],
  [[Infinity], Infinity],
  [[null], null],
  [['abc'], 'abc'],
  [[true], true],
  [[emptyObject()], emptyObject()]
];

export const wrong: Array<any> = [
  [[1], 0],
  [[1], 'abc'],
  [[1], true],
  [[1], emptyObject()],
  [[1], NaN],
  [[1], Infinity],
  [[1], null],
  [[1], undefined],
  [[NaN], NaN],
  [['abc'], 1],
  [['abc'], ''],
  [['abc'], true],
  [['abc'], emptyObject()],
  [['abc'], NaN],
  [['abc'], Infinity],
  [['abc'], null],
  [['abc'], undefined],
  [[true], false],
  [[true], 1],
  [[{}], emptyObject()]
];