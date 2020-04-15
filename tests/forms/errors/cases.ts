export const cases1: Array<any> = [
  [[], { id: 1, name: 'AwesomeName' }, { result: { id: 1, name: 'AwesomeName' }, errors: null }],
  [[], { name: 'AwesomeName' }, { result: { id: null, name: 'AwesomeName' }, errors: ['Empty id'] }],
  [[], { id: -10, name: 'AwesomeName' }, { result: { id: null, name: 'AwesomeName' }, errors: ['Must not be negative'] }],
  [[], { id: -10.5, name: 'AwesomeName' }, { result: { id: null, name: 'AwesomeName' }, errors: ['Must not be negative'] }]
];

export const cases2: Array<any> = [
  [[], { id: 1, name: 'AwesomeName' }, { result: { id: 1, name: 'AwesomeName' }, errors: null }],
  [[], { name: 'AwesomeName' }, { result: { id: null, name: 'AwesomeName' }, errors: ['Empty id'] }],
  [[], { id: -10, name: 'AwesomeName' }, { result: { id: null, name: 'AwesomeName' }, errors: ['Must not be negative'] }],
  [[], { id: -10.5, name: 'AwesomeName' }, { result: { id: null, name: 'AwesomeName' }, errors: ['Must not be negative', 'Must be an integer'] }]
];