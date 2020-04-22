import { reject, resolve } from '@test/utilities';

export const cases1: Array<any> = [
  [{ id: 1, name: 'abc' }, { id: 1, name: 'abc' }],
  [{ id: 'abc', name: null }, { id: null, name: null }],
  [{ id: resolve(1), name: resolve('abc') }, { id: 1, name: 'abc' }],
  [{ id: resolve('abc'), name: resolve('abc') }, { id: null, name: 'abc' }],
  [{ id: null, name: null }, { id: null, name: null }],
  [{ id: reject(1), name: resolve('abc') }, { id: null, name: 'abc' }],
  [resolve({ id: 1, name: 'abc' }), { id: 1, name: 'abc' }],
  [reject({ id: 1, name: 'abc' }), null],
  [resolve({ id: resolve(1, 20), name: resolve('abc', 10) }), { id: 1, name: 'abc' }]
];

export const cases2: Array<any> = [
  [[1, 2, 3], [1, 2, 3]],
  [[1, resolve(2), 3], [1, 2, 3]],
  [[resolve(1), resolve(2), reject(3)], [1, 2, null]],
  [[resolve(1, 30), resolve(2, 20), resolve(3, 10)], [1, 2, 3]],
  [resolve([1, 2, 3]), [1, 2, 3]],
  [reject([1, 2, 3]), null],
  [resolve([resolve(1), resolve('abc'), resolve(null)]), [1, null, null]]
];