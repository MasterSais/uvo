import { emptyFunction } from '@test/utilities';

export const rightParams: Array<any> = [
  [],
  ['fallback'],
  [() => 'fallback'],
  ['fallback', emptyFunction()],
  ['fallback', emptyFunction(), emptyFunction()],
  [() => 'fallback', emptyFunction(), emptyFunction()]
];

export const wrongParams: Array<any> = [
  ['f1', null],
  ['f1', undefined],
  ['f1', 0],
  ['f1', 1],
  ['f1', {}]
];

export const right: Array<any> = [
  [[10], null, 10],
  [[10], undefined, 10],
  [[10], 'abc', 10],
  [[10], 12, 12],
  [[10], 1.2, 1.2],
  [[10], '10', 10]
];