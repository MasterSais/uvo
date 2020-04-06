export const cases1: Array<any> = [
  [[], 12, { result: 12, errors: null }],
  [[], 'abc', { result: null, errors: ['number'] }],
  [[], -1, { result: null, errors: ['gte'] }],
  [[], null, { result: null, errors: ['number'] }],
  [[], undefined, { result: null, errors: ['number'] }],
  [[], 2.2, { result: null, errors: ['integer'] }]
];

export const cases2: Array<any> = [
  [[], 12, { result: 12, errors: null }],
  [[], 'abc', { result: null, errors: ['number'] }],
  [[], -1, { result: null, errors: ['gte'] }],
  [[], 2.2, { result: null, errors: ['integer'] }],
  [[], null, { result: null, errors: ['number'] }],
  [[], -2.2, { result: null, errors: ['gte', 'integer'] }]
];

export const templateCases1: Array<any> = [
  [[], 12, { result: 12, errors: null }],
  [[], 'abc', { result: null, errors: ['number'] }],
  [[], -1, { result: null, errors: ['gte'] }],
  [[], null, { result: null, errors: ['number'] }],
  [[], undefined, { result: null, errors: ['number'] }],
  [[], 2.2, { result: null, errors: ['multiple'] }]
];