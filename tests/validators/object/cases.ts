import { gte } from '@lib/classic-api/validators/is';
import { length, maxLen } from '@lib/classic-api/validators/length';
import { number } from '@lib/classic-api/validators/number';
import { string } from '@lib/classic-api/validators/string';
import { emptyArray, emptyFunction, emptyObject } from '@test/utilities';

export const rightParams: Array<any> = [
  [],
  [0],
  [undefined],
  [null],
  [false],
  [emptyObject()],
  [{ f1: number() }],
  [{ f1: number(), f2: string() }],
  [{ f1: number(), f2: [] }],
  [{ f1: number(), '': [] }],
  [{ f1: number(), f2: [string(), length(10)] }]
];

export const wrongParams: Array<any> = [
  [1],
  [[]],
  ['1'],
  [true]
];

export const right: Array<any> = [
  [[], {}],
  [[null], {}],
  [[false], {}],
  [[], { f1: '' }],
  [[], { f1: 12 }],
  [[{}], {}],
  [[{}], { f1: null }, {}],
  [[{}], { f1: true }, {}],
  [[{ f1: [] }], { f1: 12 }],
  [[{ f1: [] }], { f1: '12' }],
  [[{ f1: [] }], { f1: null }],
  [[{ f1: number() }], { f1: 12 }],
  [[{ f1: number() }], { f1: '12' }, { f1: 12 }],
  [[{ f1: number() }], { f1: 'abc' }, { f1: null }],
  [[{ f1: [number(), gte(10)] }], { f1: 11 }, { f1: 11 }],
  [[{ f1: [number(), gte(10)] }], { f1: '11' }, { f1: 11 }],
  [[{ f1: [number(), gte(10)] }], { f1: '9' }, { f1: null }],
  [[{ f1: [number(), gte(10)] }], { f1: 11, f2: 10 }, { f1: 11 }],
  [[{ f1: [number(), gte(10)] }], { f1: '11', f2: '10' }, { f1: 11 }],
  [[{ f1: [number(), gte(10)] }], { f1: '9', f2: null }, { f1: null }]
];

export const wrong: Array<any> = [
  [[], 1],
  [[], '1'],
  [[], true],
  [[], null],
  [[], undefined],
  [[], emptyArray()],
  [[], emptyFunction()],
  [[{}], 1],
  [[{ f1: number() }], '1'],
  [[{ f1: number() }], true],
  [[{ f1: string() }], null],
  [[{ f1: string() }], undefined],
  [[{ f1: string(), f2: number() }], emptyArray()],
  [[{ f1: string(), f2: number() }], emptyFunction()],
  [[{ f1: [string(), maxLen(10)], f2: number() }], emptyFunction()]
];

export const rightTemplate: Array<any> = [
  {},
  { f1: '' },
  { f1: 12 }
];

export const wrongTemplate: Array<any> = [
  1,
  'abc',
  false,
  null,
  undefined,
  emptyFunction(),
  emptyArray()
];