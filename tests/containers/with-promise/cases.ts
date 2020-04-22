export const cases: Array<any> = [
  [12, { result: 12, errors: null }],
  ['12', { result: 12, errors: null }],
  [null, { result: null, errors: ['number'] }],
  [undefined, { result: null, errors: ['number'] }],
  [NaN, { result: null, errors: ['number'] }],
  ['abc', { result: null, errors: ['number'] }],
  [-1, { result: null, errors: ['gte'] }],
  [-100, { result: null, errors: ['gte'] }],
  [2.2, { result: null, errors: ['integer'] }],
  [0.1, { result: null, errors: ['integer'] }],
  [-2.2, { result: null, errors: ['gte', 'integer'] }],
  [-0.1, { result: null, errors: ['gte', 'integer'] }]
];