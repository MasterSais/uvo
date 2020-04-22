import { reject, resolve } from '@test/utilities';

export const cases1: Array<any> = [
  [{ id: 1, name: 'abc' }, { id: 1, name: 'abc' }],
  [{ id: 1, name: resolve('abc') }, { id: 1, name: 'abc' }],
  [resolve({ id: 1, name: 'abc' }), { id: 1, name: 'abc' }],
  [resolve({ id: resolve('abc'), name: resolve('abc') }), { id: null, name: 'abc' }],
  [resolve({ id: 'abc', name: 'abc' }), { id: null, name: 'abc' }],
  [resolve({ id: 'abc', name: undefined }), { id: null, name: null }],
  [reject({ id: 1, name: 'abc' }), null],
  [resolve(10), null],
  [resolve({}), { id: null, name: null }]
];

export const cases2: Array<any> = [
  [[1, 2, 3], [1, 2, 3]],
  [[1, resolve(2), null], [1, 2, null]],
  [[resolve(1), resolve(2), reject(3)], [1, 2, null]],
  [[resolve('abc'), resolve(2), reject(3)], [null, 2, null]],
  [[resolve(1), resolve(2), resolve(3)], [1, 2, 3]],
  [resolve([1, 2, 3]), [1, 2, 3]],
  [reject([1, 2, 3]), null]
];

export const cases3: Array<any> = [
  [{ id: 1, name: 'abc' }, { result: { id: 1, name: 'abc' }, errors: null }],
  [reject({ id: 1, name: 'abc' }), { result: null, errors: ['promiseErr'] }],
  [resolve({ id: 1, name: 'abc' }), { result: { id: 1, name: 'abc' }, errors: null }],
  [resolve({ id: resolve(1), name: 'abc' }), { result: { id: 1, name: 'abc' }, errors: null }],
  [resolve({ id: resolve('abc'), name: 'abc' }), { result: { id: null, name: 'abc' }, errors: ['numberErr'] }],
  [resolve({ id: resolve(null), name: 'abc' }), { result: { id: null, name: 'abc' }, errors: ['numberErr'] }],
  [resolve({ id: reject('idErr'), name: 'abc' }), { result: { id: null, name: 'abc' }, errors: ['idErr'] }],
  [resolve({ id: 1, name: resolve(null) }), { result: { id: 1, name: null }, errors: ['stringErr'] }],
  [resolve({ id: 1, name: reject('abc') }), { result: { id: 1, name: null }, errors: null }],
  [resolve(10), { result: null, errors: ['objectErr'] }],
  [resolve({ id: 'abc', name: null }), { result: { id: null, name: null }, errors: ['stringErr', 'numberErr'] }]
];

export const cases4: Array<any> = [
  [{ user: resolve({ id: 1, name: 'abc' }), roles: null }, { user: { id: 1, name: 'abc' }, roles: [1] }],
];