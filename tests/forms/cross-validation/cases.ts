const now = Date.now();

export const cases: Array<any> = [
  [[], { a: null, b: null, c: null }, { a: null, b: null, c: null }],
  [[], { a: null, b: now + 1000, c: now + 2000 }, { a: null, b: now + 1000, c: now + 2000 }],
  [[], { a: now, b: now + 1000, c: now + 2000 }, { a: now, b: now + 1000, c: now + 2000 }],
  [[], { a: now, b: now + 1000, c: now - 2000 }, { a: now, b: now + 1000, c: null }],
  [[], { a: now, b: now - 1000, c: now - 2000 }, { a: now, b: null, c: now - 2000 }]
];