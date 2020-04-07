export const cases: Array<any> = [
  [[], { id: 1, node: { id: 2, node: { id: 3, node: { id: 4 } } } }, { id: 1, node: { id: 2, node: { id: 3, node: { id: 4, node: null } } } }],
  [[], { id: 1, node: { id: -1, node: { id: 3, node: { id: 4 } } } }, { id: 1, node: { id: null, node: { id: 3, node: { id: 4, node: null } } } }],
  [[], { id: 1, node: { id: -1, node: [1] } }, { id: 1, node: { id: null, node: null } }]
];