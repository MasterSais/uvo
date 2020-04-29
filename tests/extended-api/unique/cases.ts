export const right: Array<any> = [
  [[], [1, 2, 3], [1, 2, 3]],
  [[], [1, 2, 1], [1, 2, null]],
  [[], [1, 2, 1, 1], [1, 2, null, null]],
  [[], [1, 2, 1, 2], [1, 2, null, null]]
];

export const wrong: Array<any> = [
  [[], null, null],
  [[], 10, null]
];

export const objCases: Array<any> = [
  [['id'], [{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 1 }, { id: 2 }, { id: 3 }]],
  [['id'], [{ id: 1 }, { id: 2 }, { id: 1 }], [{ id: 1 }, { id: 2 }, null]],
  [['id'], [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 1 }], [{ id: 1 }, { id: 2 }, null, null]],
  [['id'], [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }], [{ id: 1 }, { id: 2 }, null, null]],
];