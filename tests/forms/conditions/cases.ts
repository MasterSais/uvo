export const cases: Array<any> = [
  [[], { id: 3, name: 'AwesomeLogin' }, { id: 3, name: 'AwesomeLogin' }],
  [[], { id: 3, name: 'BadLogin' }, { id: 3, name: null }],
  [[], { id: -2, name: 'BadLogin' }, { id: null, name: 'BadLogin' }]
];