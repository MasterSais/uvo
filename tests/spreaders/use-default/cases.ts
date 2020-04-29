import { clamp } from '@lib/base-api/extensions/processors/clamp';
import { emptyFunction } from '@test/utilities';

export const rightParams: Array<any> = [
  [],
  ['default'],
  [() => 'default'],
  ['default', emptyFunction()],
  ['default', emptyFunction(), emptyFunction()],
  [() => 'default', emptyFunction(), emptyFunction()]
];

export const wrongParams: Array<any> = [
  ['f1', null],
  ['f1', undefined],
  ['f1', 0],
  ['f1', 1],
  ['f1', {}]
];

export const cases: Array<any> = [
  [['default', emptyFunction()], null, 'default'],
  [[5, clamp(0, 10)], 15, 10],
  [[5, clamp(0, 10)], undefined, 5],
];

export const templateCases: Array<any> = [
  [[], 10, '10'],
  [[], null, 10],
  [[], undefined, 10],
  [[], {}, null],
  [[], true, 'true'],
];