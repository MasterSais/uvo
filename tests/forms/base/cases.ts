export const cases: Array<any> = [
  [[], { id: 3, name: 'YourAwesomeUserName' }, { id: 3, name: 'YourAwesomeUserName' }],
  [[], { id: 3, name: ('YourAwesomeUserName').repeat(10) }, { id: 3, name: null }],
  [[], { id: -1, name: 'YourAwesomeUserName' }, { id: null, name: 'YourAwesomeUserName' }],
  [[], { id: 101, name: 'YourAwesomeUserName' }, { id: null, name: 'YourAwesomeUserName' }],
  [[], { id: 3, name: 'ShortName' }, { id: 3, name: null }],
  [[], { id: 'ff', name: 'ShortName' }, { id: null, name: null }],
  [[], { id: 'ff', name: null }, { id: null, name: null }],
  [[], { id: null, name: null }, { id: null, name: null }]
];