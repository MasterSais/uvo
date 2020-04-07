export const cases1: Array<any> = [
  [[], 12, { result: 12, errors: null }],
  [[], 'abc', { result: null, errors: ['E1'] }],
  [[], -1, { result: null, errors: ['E2'] }],
  [[], null, { result: null, errors: ['E1'] }],
  [[], undefined, { result: null, errors: ['E1'] }],
  [[], 2.2, { result: null, errors: ['E3'] }]
];

export const cases2: Array<any> = [
  [[], 12, { result: 12, errors: null }],
  [[], 'abc', { result: null, errors: ['E1'] }],
  [[], -1, { result: null, errors: ['E2'] }],
  [[], 2.2, { result: null, errors: ['E3'] }],
  [[], null, { result: null, errors: ['E1'] }],
  [[], -2.2, { result: null, errors: ['E2', 'E3'] }]
];