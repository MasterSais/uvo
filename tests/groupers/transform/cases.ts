import { clamp } from '@lib/classic-api/processors/clamp';
import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const rightParams: Array<any> = [
  [],
  [emptyFunction()],
  [emptyFunction(), emptyFunction()],
  [(value: any) => value + 1]
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
  [[clamp(0, 5)], -1, 0],
  [[clamp(-100, 100), clamp(-10, 0), clamp(2, 8)], 300, 2],
  [[(value: any) => value + 1], 10, 11]
];