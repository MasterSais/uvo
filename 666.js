const { performance } = require('perf_hooks');

const { compile } = require('./template');

const v = (
  compile(`
    @object(
      name : @string : @length( >=4, <=25 ),
      email : @string,
      firstName : @string,
      phone : @string,
      age : @number : @compare( %1, >=18 )
    )
  `)()
);

console.log(
  v({ name: 'name', email: 'mail', firstName: 'firstname', phone: 'phone', age: 18 }),
  v({ name: 'n', age: 18 }),
  v({ name: 'n', age: 18.5 }),
  v({ name: 'n', age: 17 }),
  v({ age: 'abc' }),
  v({}),
  v(),
);

const tests = [
  { name: 'name', email: 'mail', firstName: 'firstname', phone: 'phone', age: 18 },
  { name: 'n', age: 18 },
  { name: 'n', age: 18.5 },
  { name: 'n', age: 17 },
  { age: 'abc' },
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