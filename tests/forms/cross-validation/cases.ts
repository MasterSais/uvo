const now = Date.now();

export const cases: Array<any> = [
  [[], { a: null, b: null, c: null }, { a: null, b: null, c: null }],
  [[], { a: null, b: now + 1000, c: now + 2000 }, { a: null, b: now + 1000, c: now + 2000 }],
  [[], { a: now, b: now + 999, c: now + 2000 }, { a: now, b: null, c: now + 2000 }],
  [[], { a: now, b: now + 1000, c: now + 2000 }, { a: now, b: now + 1000, c: now + 2000 }],
  [[], { a: now, b: now + 1000, c: now - 2000 }, { a: now, b: now + 1000, c: null }],
  [[], { a: now, b: now - 1000, c: now - 2000 }, { a: now, b: null, c: now - 2000 }]
];

export const cases2: Array<any> = [
  [[], { a: 10, b: 10 }],
  [[], { a: 'abc', b: 'abc' }, { a: null, b: null }],
  [[], { a: 'abc', b: 5 }, { a: null, b: 5 }],
  [[], { a: '10', b: 5 }, { a: 10, b: null }]
];