export const right: Array<any> = [
  [[1], [0]],
  [[1], [0, 0]],
  [[1], ['0']],
  [[1], 'a'],
  [[1], 'abc'],
  [[1], { length: 1 }],
  [[1], { length: 2 }]
];

export const wrong: Array<any> = [
  [[1], 1],
  [[1], Infinity],
  [[1], NaN],
  [[1], ''],
  [[1], true],
  [[1], { length: '1' }],
  [[1], []]
];

export const rightForNot: Array<any> = [
  [[1], []],
  [[1], ''],
  [[1], { length: 0 }]
];

export const wrongForNot: Array<any> = [
  [[1], [0, 0]],
  [[1], 1],
  [[1], Infinity],
  [[1], NaN],
  [[1], true],
  [[1], { length: '1' }]
];