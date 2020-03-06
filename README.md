# `USOV`
USOV is a JavaScript universal single object validator. It provides validation and transformation utilities. Each validator is represented by separated module (no carrying as in another validation libraries), thats gives opportunity for treeshaking. Library has 5 types of modules: validators (only validates entity), processors (only transforms entity), groupers (groups another validators in specific way), spreaders (provides crossvalidation between distanted fields and provides recursion), containers (provides additional input/output processing).
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [`Install`](#install)
- [`Usage`](#usage)
- [`API`](#api)
  - [`Validators`](#validators)
    - [`array<T>(itemSpec?: Array<Processor<any, T>> | Processor<any, T>, error?: Error): Processor<Array<any>, Array<T>>`](#arraytitemspec-arrayprocessorany-t--processorany-t-error-error-processorarrayany-arrayt)
    - [`bool<T>(error?: Error): Processor<T, boolean>`](#boolterror-error-processort-boolean)
    - [`empty<T extends unknown>(error?: Error): Validator<T>`](#emptyt-extends-unknownerror-error-validatort)
    - [`equal<T>(match: T, error?: Error): Validator<T>`](#equaltmatch-t-error-error-validatort)
    - [`fields<T extends ObjectLike>(spec: Fields, error?: Error): Validator<T>`](#fieldst-extends-objectlikespec-fields-error-error-validatort)
    - [`gte<T>(bound: T, error?: Error): Validator<T>`](#gtetbound-t-error-error-validatort)
    - [`integer(error?: Error): Validator<number>`](#integererror-error-validatornumber)
    - [`len<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#lent-extends-lengthylen-number-error-error-validatort)
    - [`lte<T>(bound: T, error?: Error): Validator<T>`](#ltetbound-t-error-error-validatort)
    - [`maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#maxlent-extends-lengthylen-number-error-error-validatort)
    - [`minLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#minlent-extends-lengthylen-number-error-error-validatort)
    - [`notEmpty<T extends unknown>(error?: Error): Validator<T>`](#notemptyt-extends-unknownerror-error-validatort)
    - [`notEqual<T>(match: T, error?: Error): Validator<T>`](#notequaltmatch-t-error-error-validatort)
    - [`number<T extends unknown>(error?: Error): Processor<T, number>`](#numbert-extends-unknownerror-error-processort-number)
    - [`object<T extends ObjectLike, R extends ObjectLike>(spec?: ObjectRecords, error?: Error): Processor<T, R>`](#objectt-extends-objectlike-r-extends-objectlikespec-objectrecords-error-error-processort-r)
    - [`object2<T extends ObjectLike, R extends ObjectLike>(spec?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R>`](#object2t-extends-objectlike-r-extends-objectlikespec-arraystring-arrayprocessorany-any-error-error-processort-r)
    - [`oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>`](#oneoftcandidates-arrayt-error-error-validatort)
    - [`regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>`](#regext-extends-unknownmatch-regexp-error-error-validatort)
    - [`string<T>(error?: Error): Processor<T, string>`](#stringterror-error-processort-string)

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
## `API`
### `Validators`
Common types.
#### `array<T>(itemSpec?: Array<Processor<any, T>> | Processor<any, T>, error?: Error): Processor<Array<any>, Array<T>>`

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
// => null
```

#### `bool<T>(error?: Error): Processor<T, boolean>`

Checks value to be a boolean compatible.

#### `empty<T extends unknown>(error?: Error): Validator<T>`

Checks value to be empty.

#### `equal<T>(match: T, error?: Error): Validator<T>`

Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.

#### `fields<T extends ObjectLike>(spec: Fields, error?: Error): Validator<T>`

Checks for fields in the input object.

#### `gte<T>(bound: T, error?: Error): Validator<T>`

Checks value to be greater or equal to 'match' param. Requires the same type.

#### `integer(error?: Error): Validator<number>`

Checks number to be an integer.

#### `len<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like.

#### `lte<T>(bound: T, error?: Error): Validator<T>`

Checks value to be lower or equal to 'match' param. Requires the same type.

#### `maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like.

#### `minLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like.

#### `notEmpty<T extends unknown>(error?: Error): Validator<T>`

Checks value not to be empty.

#### `notEqual<T>(match: T, error?: Error): Validator<T>`

Checks value to be not equal to 'match' param. Requires the same type. Shallow comparison.

#### `number<T extends unknown>(error?: Error): Processor<T, number>`

Checks value to be a number compatible.

#### `object<T extends ObjectLike, R extends ObjectLike>(spec?: ObjectRecords, error?: Error): Processor<T, R>`

Checks value to be an object.

#### `object2<T extends ObjectLike, R extends ObjectLike>(spec?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R>`

Checks value to be an object.

#### `oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>`

Checks value to be one of expected. Shallow comparison.

#### `regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>`

Checks value to match a pattern.

#### `string<T>(error?: Error): Processor<T, string>`

Checks value to be a string compatible.

