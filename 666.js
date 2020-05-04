const { performance } = require('perf_hooks');

const { compile } = require('./template');

const v = (
  compile(`
    @object(
      name : @string : @length( >=4, <=25 ),
      age : @number : @compare( %1, >=18 ),
      date : @date,
      check : @bool
    )
  `)()
);

console.log(
  v({ name: 'name', age: 18, date: 1432423432, check: 1 }),
  v({ name: 'n', age: 18, date: 'Thu Jan 01 1970 03:00:05 GMT+0300 (Москва, стандартное время)', check: true }),
  v({ name: 'n', age: 18.5, date: '432fsdfsd', check: 'true' }),
  v({ name: 'n', age: 17, check: 'false' }),
  v({ age: 'abc', check: '0' }),
  v({}),
  v(),
);

const tests = [
  { name: 'name', age: 18, date: 1432423432, check: 1 },
  { name: 'n', age: 18, date: 'Thu Jan 01 1970 03:00:05 GMT+0300 (Москва, стандартное время)', check: true },
  { name: 'n', age: 18.5, date: '432fsdfsd', check: 'true' },
  { name: 'n', age: 17, check: 'false' },
  { age: 'abc', check: '0' },
  {},
];

const count = 1000000;

const ts = performance.now();

for (let i = 0; i < count; i++) {
  for (const test of tests) {
    v(test);
  }
}

const te = performance.now();

console.log(te - ts, count * tests.length);