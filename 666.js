const { performance } = require('perf_hooks');

const { compile } = require('./template/cjs/index.min.js');

const v = (
  compile(`
    @object(
      id : @number : @compare(>=0),
      name : @string
    )
  `)()
);

console.log(
  v({ id: 1, name: 'name' }),
  v({ id: 'abc', name: 'name' }),
  v({ id: 1, name: null }),
  v(null),
);

const tests = [
  { id: 1, name: 'name' },
  { id: 'abc', name: 'name' },
  { id: 1, name: null }
];

const count = 10000000;

const ts = performance.now();

for (let i = 0; i < count; i++) {
  for (const test of tests) {
    v(test);
  }
}

const te = performance.now();

console.log(te - ts, count * tests.length);