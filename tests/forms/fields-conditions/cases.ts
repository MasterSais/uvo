export const cases: Array<any> = [
  [[], { id: 3, guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' }, null],
  [[], { id: 3, login: 'AwesomeLogin' }, { id: 3, guid: null, login: 'AwesomeLogin' }],
  [[], { id: 3, login: 'BadLogin' }, { id: 3, guid: null, login: null }],
  [[], { guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' }, { id: null, guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' }],
  [[], { guid: '00000000-0000-0000-0000-000000000000', login: 'BadLogin' }, { id: null, guid: '00000000-0000-0000-0000-000000000000', login: null }],
  [[], { login: 'AwesomeLogin' }, null]
];