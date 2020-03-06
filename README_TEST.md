# `USOV`
USOV is a JavaScript universal single object validator. It provides half-safe validation and transformation utilities. Each validator is represented by separated module (no carrying as in another validation libraries), thats gives opportunity for treeshaking. Library has 5 types of modules: validators (only validates entity), processors (only transforms entity), groupers (groups another validators in specific way), spreaders (provides crossvalidation between distanted fields amd recursion), containers (provides additional input/output processing).
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [`Install`](#install)
- [`Usage`](#usage)
- [`Types`](#types)
  - [`array(itemSpec?: Array<Processor> or Processor, error?: Error): Processor`](#arrayitemspec-arrayprocessor-or-processor-error-error-processor)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## `Install`
```sh
npm install usov
```
## `Usage`
```js
import * as v from 'usov'; // for everything (recommended in all cases for better minification result e.g. in webpack)
// or
import { number, array } from 'usov'; // for only what you need
```

```js
import * as v from 'usov';

v.number()(10)
// => 10

v.number()('abc')
// => null

const simpleObj = (
  v.object({
    id: [v.number(), v.gte(0)],
    name: [v.string(), v.minLen(10)],
    role: [v.string(), v.regex(/^[A-Z]{5,20}$/)]
  })
);
// or extended solution (recommended)
const extObj = (
  v.object2([
    ['id', v.number(), v.gte(0)],
    ['name', v.string(), v.minLen(10)],
    ['role', v.string(), v.regex(/^[A-Z]{5,20}$/)]
  ])
);

simpleObj({
  id: 3, // right
  name: 'YourAwesomeUserName', // right
  role: 'invalidRole' // wrong. Will be null
})
// => { id: 3, name: 'YourAwesomeUserName', role: null }
```
## `Types`
Common types.
### `array(itemSpec?: Array<Processor> or Processor, error?: Error): Processor`

Checks value to be an array.

```js
import * as v from 'usov';

const simpleOne = (
  v.array([ // is array?
    v.number(), // is element can be a number?
    v.gte(0) // is element positive or zero?
  ])
);

simpleOne('abc' as unknown as Array<any>); // not an array.
// => null

simpleOne([0, 1, 2]); // right.
// => [0, 1, 2]

simpleOne([0, -1, 2]); // '-1' is negative.
// => [0, null, 2]

simpleOne([0, 1, 'a']); // 'a' is a string.
// => [0, 1, null]

//but
simpleOne([0, 1, '2']); // right.
// => [0, 1, 2]

const anotherOne = (
  v.consecutive( // checks input sequentially with few validators.
    v.array([
      v.number(),
      v.clamp(0, 10) // clamps value between provided boundaries.
    ]),
    v.maxLen(3) // checks array's length.
  )
);

anotherOne([0, 1, 2]); // right.
// => [0, 1, 2]

anotherOne([0, 1, 20]); // '20' will be clamped to '10'.
// => [0, 1, 10]

anotherOne([0, 1, 2, 3]); // too long.
// => null```