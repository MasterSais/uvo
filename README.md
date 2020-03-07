# `USOV`
USOV is a JavaScript universal single object validator. It provides validation and transformation utilities. Each validator is represented by separated module (no carrying as in another validation libraries), thats gives opportunity for treeshaking. Library has 5 types of modules: validators (only validates entity), processors (only transforms entity), groupers (groups another validators in specific way), spreaders (provides crossvalidation between distanted fields and provides recursion), containers (provides additional input/output processing).
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [`Install`](#install)
- [`Usage`](#usage)
- [`API`](#api)
  - [`Types`](#types)
    - [`ErrorCallback`](#errorcallback)
    - [`Error`](#error)
    - [`FieldsSpec`](#fieldsspec)
    - [`MetaData`](#metadata)
    - [`ObjectSpec`](#objectspec)
    - [`Processor`](#processor)
    - [`Relevance`](#relevance)
    - [`Result`](#result)
    - [`Validator`](#validator)
  - [`Validators`](#validators)
    - [`array<T>(itemSpec?: Array<Processor<any, T>> | Processor<any, T>, error?: Error): Processor<Array<any>, Array<T>>`](#arraytitemspec-arrayprocessorany-t--processorany-t-error-error-processorarrayany-arrayt)
    - [`bool<T>(error?: Error): Processor<T, boolean>`](#boolterror-error-processort-boolean)
    - [`empty<T extends unknown>(error?: Error): Validator<T>`](#emptyt-extends-unknownerror-error-validatort)
    - [`equal<T>(match: T, error?: Error): Validator<T>`](#equaltmatch-t-error-error-validatort)
    - [`fields<T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T>`](#fieldst-extends-objectlikespec-fieldsspec-error-error-validatort)
    - [`gte<T>(bound: T, error?: Error): Validator<T>`](#gtetbound-t-error-error-validatort)
    - [`integer(error?: Error): Validator<number>`](#integererror-error-validatornumber)
    - [`len<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#lent-extends-lengthylen-number-error-error-validatort)
    - [`lte<T>(bound: T, error?: Error): Validator<T>`](#ltetbound-t-error-error-validatort)
    - [`maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#maxlent-extends-lengthylen-number-error-error-validatort)
    - [`minLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#minlent-extends-lengthylen-number-error-error-validatort)
    - [`notEmpty<T extends unknown>(error?: Error): Validator<T>`](#notemptyt-extends-unknownerror-error-validatort)
    - [`notEqual<T>(match: T, error?: Error): Validator<T>`](#notequaltmatch-t-error-error-validatort)
    - [`number<T extends unknown>(error?: Error): Processor<T, number>`](#numbert-extends-unknownerror-error-processort-number)
    - [`object<T extends ObjectLike, R extends ObjectLike>(spec?: ObjectSpec, error?: Error): Processor<T, R>`](#objectt-extends-objectlike-r-extends-objectlikespec-objectspec-error-error-processort-r)
    - [`object2<T extends ObjectLike, R extends ObjectLike>(spec?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R>`](#object2t-extends-objectlike-r-extends-objectlikespec-arraystring-arrayprocessorany-any-error-error-processort-r)
    - [`oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>`](#oneoftcandidates-arrayt-error-error-validatort)
    - [`regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>`](#regext-extends-unknownmatch-regexp-error-error-validatort)
    - [`string<T>(error?: Error): Processor<T, string>`](#stringterror-error-processort-string)
  - [`Processors`](#processors)
    - [`clamp<T>(min: T, max: T): Processor<T, T>`](#clamptmin-t-max-t-processort-t)
    - [`erase<T>(): Processor<T, T>`](#eraset-processort-t)
    - [`lowercase(): Processor<string, string>`](#lowercase-processorstring-string)
    - [`round(): Processor<number, number>`](#round-processornumber-number)
    - [`uppercase(): Processor<string, string>`](#uppercase-processorstring-string)
  - [`Groupers`](#groupers)
    - [`consecutive<T>(...validators: Array<Processor<any, T> | Processor<any, T>>): Processor<any, T>`](#consecutivetvalidators-arrayprocessorany-t--processorany-t-processorany-t)
    - [`or<T>(...validators: Array<Processor<T, unknown>>): Processor<T, unknown>`](#ortvalidators-arrayprocessort-unknown-processort-unknown)
    - [`parallel<T>(...validators: Array<Validator<T>>): Validator<T>`](#paralleltvalidators-arrayvalidatort-validatort)
    - [`transform<T, R>(...processors: Array<Processor<T | R, R>>): Processor<T | R, R>`](#transformt-rprocessors-arrayprocessort--r-r-processort--r-r)
  - [`Containers`](#containers)
    - [`withErrors<T, R>(validator: Processor<T, R>, commonErrorProcessor?: ((meta?: MetaData) => Error)): Processor<T, Result<R>>`](#witherrorst-rvalidator-processort-r-commonerrorprocessor-meta-metadata--error-processort-resultr)
    - [`withMeta<T, R>(validator: Processor<T, R>): Processor<T, R>`](#withmetat-rvalidator-processort-r-processort-r)
    - [`withPromise<T, R>(validator: Processor<T, R | Result<R>>): Processor<T, Promise<R | Array<Error>>>`](#withpromiset-rvalidator-processort-r--resultr-processort-promiser--arrayerror)
  - [`Spreaders`](#spreaders)
    - [`getDep<T>(field: string, preValidator?: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T>`](#getdeptfield-string-prevalidator-dep-t--validatort--arrayvalidatort-validatort)
    - [`setDep<T>(field: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>`](#setdeptfield-string-extvalue-any--value-t-meta-metadata--any-validatort)
    - [`setVDep<T>(field: string, ...validators: Array<Validator<T>>): Validator<T>`](#setvdeptfield-string-validators-arrayvalidatort-validatort)
    - [`useDefault<T, R>(defaultValue: R | (() => R), ...validators: Array<Processor<T | R, R>>): Processor<T | R, R>`](#usedefaultt-rdefaultvalue-r----r-validators-arrayprocessort--r-r-processort--r-r)

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

v.number()(10);
// => 10

v.number()('abc');
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
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }
```
## `API`
### `Types`
The main types used in the library.
#### `ErrorCallback`

Calls on validation error.

```js
type ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) => void;
```

#### `Error`

Any type's error. Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.

```js
type Error = (
  string
  | boolean
  | number
  | Record<any, any>
  | Array<any>
  | ((meta: MetaData) => any)
);
```

#### `FieldsSpec`

Specification for 'fields' validator.

```js
type FieldsSpec = (
  string
  | [
    ('&' | '|' | '^'),
    FieldsSpec | string,
    FieldsSpec | string,
    ...Array<FieldsSpec | string>
  ]
);
```

#### `MetaData`

Internal data for errors and dependencies.

```js
type MetaData = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  _deps: Record<string, any>;
};
```

#### `ObjectSpec`

Specification for 'object' and 'object2' validators.

```js
type ObjectSpec = Record<string, Array<Processor<any, any>> | Processor<any, any>>;
```

#### `Processor`

Processes value.

```js
type Processor<T, R> = (value: T, onError?: ErrorCallback, meta?: MetaData) => R;
```

#### `Relevance`

Error's relevancy status.

```js
type Relevance = {
  value: boolean;
};
```

#### `Result`

'WithError' container's result. Will be null if no errors.

```js
type Result<T> = {
  result: T;
  errors?: Array<any>;
};
```

#### `Validator`

Validates value.

```js
type Validator<T> = (value: T, onError?: ErrorCallback, meta?: MetaData) => T;
```

### `Validators`
Checks input with some conditions. Returns input value on success, otherwise 'null' will be returned.
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

simpleOne('abc' as any); // not an array.
// => null

simpleOne([0, 1, 2]);
// => [0, 1, 2]

simpleOne([0, -1, 2]); // '-1' is negative.
// => [0, null, 2]

simpleOne([0, 1, 'a']); // 'a' is a string.
// => [0, 1, null]

//but
simpleOne([0, 1, '2']);
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

anotherOne([0, 1, 2]);
// => [0, 1, 2]

anotherOne([0, 1, 20]); // '20' will be clamped to '10'.
// => [0, 1, 10]

anotherOne([0, 1, 2, 3]); // too long.
// => null
```

#### `bool<T>(error?: Error): Processor<T, boolean>`

Checks value to be a boolean compatible.

```js
import * as v from 'usov';

v.bool()(true);
// => true

v.bool()(1);
// => true

v.bool()('false');
// => false

v.bool()('0');
// => false

v.bool()(10);
// => null

v.bool()('abc');
// => null
```

#### `empty<T extends unknown>(error?: Error): Validator<T>`

Checks value to be empty.

```js
import * as v from 'usov';

v.empty()(null);
// => null

v.empty()(undefined);
// => undefined

v.empty()('');
// => ''

v.empty()(true);
// => null

v.empty()('abc');
// => null

v.empty()(0);
// => null
```

#### `equal<T>(match: T, error?: Error): Validator<T>`

Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.

```js
import * as v from 'usov';

v.equal(10)(10);
// => 10

v.equal('10')(10 as any);
// => null

v.equal([1, 2, 3])([1, 2, 3]); // it's not a deep equality. Only checks links.
// => null
```

#### `fields<T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T>`

Checks for fields in the input object.

```js
import * as v from 'usov';

v.fields('f1')({ f1: 1 }); // requires 'f1' field.
// => { f1: 1 }

v.fields('f1')({ f1: 1, f2: 2 });
// => { f1: 1 }

v.fields(['&', 'f1', 'f2'])({ f1: 1, f2: 2 }); // requires both of fields.
// => { f1: 1, f2: 2 }

v.fields(['&', 'f1', 'f2'])({ f1: 1, f2: null });
// => null

v.fields(['|', 'f1', 'f2'])({ f1: 1, f2: 2 }); // requires at least one field.
// => { f1: 1, f2: 2 }

v.fields(['|', 'f1', 'f2'])({ f1: 1, f2: null });
// => { f1: 1, f2: null }

v.fields(['|', 'f1', 'f2'])({ f1: null });
// => null

v.fields(['^', 'f1', 'f2'])({ f1: 1, f2: 2 }); // requires at only one field.
// => null

v.fields(['^', 'f1', 'f2'])({ f1: 1, f2: null });
// => { f1: 1, f2: null }

v.fields(['^', 'f1', 'f2'])({ f1: null });
// => null

// complex conditions
v.fields(['&', ['^', 'id', 'guid'], 'role', ['|', 'fullname', 'nickname']]);
// requires identifier ('id' either 'guid'), 'role', name ('fullname' or 'nickname' or both).
```

#### `gte<T>(bound: T, error?: Error): Validator<T>`

Checks value to be greater or equal to 'match' param. Requires the same type.

```js
import * as v from 'usov';

v.gte(0)(1);
// => 1

v.gte('0')('1');
// => '1'

v.gte(false)(true);
// => true

v.gte(0)(-1);
// => null

v.gte('b')('a');
// => null

v.gte(true)(false);
// => null
```

#### `integer(error?: Error): Validator<number>`

Checks number to be an integer.

```js
import * as v from 'usov';

v.integer()(1);
// => 1

v.integer()(1.1);
// => null

v.integer()('1' as any); // requires a number.
// => null
```

#### `len<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like.

```js
import * as v from 'usov';

v.len(3)([0, 1, 2]);
// => [0, 1, 2]

v.len(3)('abc');
// => 'abc'

v.len(3)({ length: 3 });
// => { length: 3 }

v.len(3)(10 as any);
// => null

v.len(3)({ length: '3' } as any);
// => null
```

#### `lte<T>(bound: T, error?: Error): Validator<T>`

Checks value to be lower or equal to 'match' param. Requires the same type.

```js
import * as v from 'usov';

v.lte(2)(1);
// => 1

v.lte('2')('1');
// => '1'

v.lte(true)(true);
// => true

v.lte(0)(1);
// => null

v.lte('a')('b');
// => null

v.lte(false)(true);
// => null
```

#### `maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like.

```js
import * as v from 'usov';

v.maxLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.maxLen(3)([0, 1, 2, 3]);
// => null

v.maxLen(3)('abc');
// => 'abc'

v.maxLen(3)({ length: 3 });
// => { length: 3 }
```

#### `minLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like.

```js
import * as v from 'usov';

v.minLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.minLen(3)([0, 1]);
// => null

v.minLen(3)('abc');
// => 'abc'

v.minLen(3)({ length: 3 });
// => { length: 3 }
```

#### `notEmpty<T extends unknown>(error?: Error): Validator<T>`

Checks value not to be empty.

```js
import * as v from 'usov';

v.notEmpty()(null);
// => null

v.notEmpty()(undefined);
// => null

v.notEmpty()('');
// => null

v.notEmpty()(true);
// => true

v.notEmpty()('abc');
// => 'abc'

v.notEmpty()(0);
// => 0
```

#### `notEqual<T>(match: T, error?: Error): Validator<T>`

Checks value to be not equal to 'match' param. Requires the same type. Shallow comparison.

```js
import * as v from 'usov';

v.notEqual(10)(10);
// => null

v.notEqual('10')(10 as any);
// => 10

v.notEqual([1, 2, 3])([1, 2, 3]); // it's not a deep equality. Only checks links.
// => [1, 2, 3]
```

#### `number<T extends unknown>(error?: Error): Processor<T, number>`

Checks value to be a number compatible.

```js
import * as v from 'usov';

v.number()(10);
// => 10

v.number()('10');
// => 10

v.number()(true);
// => 1

v.number()('true');
// => null

v.number()('12.1');
// => 12.1
```

#### `object<T extends ObjectLike, R extends ObjectLike>(spec?: ObjectSpec, error?: Error): Processor<T, R>`

Checks value to be an object.

```js
import * as v from 'usov';

const simpleObj = (
  v.object({ // is object?
    id: [v.number(), v.gte(0)], 
    name: [v.string(), v.minLen(10)],
    role: [v.string(), v.regex(/^[A-Z]{5,20}$/)]
  })
);

simpleObj({
  id: 3,
  name: 'YourAwesomeUserName',
  role: 'invalidRole' // wrong. Will be null
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }

simpleObj([]);
// => null

simpleObj(10 as any);
// => null
```

#### `object2<T extends ObjectLike, R extends ObjectLike>(spec?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R>`

Checks value to be an object.

```js
import * as v from 'usov';

const simpleObj = (
  v.object2([ // is object?
    ['id', v.number(), v.gte(0)],
    ['name', v.string(), v.minLen(10)],
    ['role', v.string(), v.regex(/^[A-Z]{5,20}$/)]
  ])
);

simpleObj({
  id: 3,
  name: 'YourAwesomeUserName',
  role: 'invalidRole' // wrong. Will be null
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }

simpleObj([]);
// => null

simpleObj(10 as any);
// => null
```

#### `oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>`

Checks value to be one of expected. Shallow comparison.

```js
import * as v from 'usov';

v.oneOf([0, 1, 2])(1);
// => 10

v.oneOf([0, 1, 2])(3);
// => null

v.oneOf([0, 1, [1]])([1]); // not a deep equality.
// => null
```

#### `regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>`

Checks value to match a pattern.

```js
import * as v from 'usov';

v.regex(/[0-9]/)(1);
// => 1

v.regex(/[0-9]/)(11);
// => null
```

#### `string<T>(error?: Error): Processor<T, string>`

Checks value to be a string compatible.

```js
import * as v from 'usov';

v.string()(1);
// => '1'

v.string()('1');
// => '1'

v.string()(true);
// => 'true'

v.string()([1, 2]);
// => null
```

### `Processors`
Processes input value. No input types check. Recommended to use validators before.
#### `clamp<T>(min: T, max: T): Processor<T, T>`

Clamps value to required boundaries.

```js
import * as v from 'usov';

v.clamp(0, 5)(2);
// => 2

v.clamp(0, 5)(-2);
// => 0

v.clamp(0, 5)(7);
// => 5

v.clamp('c', 'e')('d');
// => 'd'

v.clamp('c', 'e')('a');
// => 'c'

v.clamp('c', 'e')('f');
// => 'e'
```

#### `erase<T>(): Processor<T, T>`

Erase input.

```js
import * as v from 'usov';

v.erase()(2);
// => null
```

#### `lowercase(): Processor<string, string>`

Lowercase input string.

```js
import * as v from 'usov';

v.lowercase()('ABC');
// => 'abc'
```

#### `round(): Processor<number, number>`

Round input number.

```js
import * as v from 'usov';

v.round()(10);
// => 10

v.round()(10.2);
// => 10

v.round()(9.8);
// => 10
```

#### `uppercase(): Processor<string, string>`

Uppercase input string.

```js
import * as v from 'usov';

v.uppercase()('abc');
// => 'ABC'
```

### `Groupers`
Groups validators in a specific way.
#### `consecutive<T>(...validators: Array<Processor<any, T> | Processor<any, T>>): Processor<any, T>`

Groups validators sequentially. Passes value through a sequence of validators until an error occurs. Uses by default in 'object' validator's scheme for fields.

```js
import * as v from 'usov';

const unchi = (
  v.consecutive(
    v.number(),
    v.gte(0)
  )
);

unchi(10);
// => 10

unchi(-1);
// => null

unchi('a');
// => null
```

#### `or<T>(...validators: Array<Processor<T, unknown>>): Processor<T, unknown>`

Groups validators sequentially. Searches for first successful validator's result.

```js
import * as v from 'usov';

const unchi = (
  v.or(
    v.number(),
    v.bool()
  )
);

unchi(10);
// => 10

unchi('true');
// => 'true'

unchi('abc');
// => null
```

#### `parallel<T>(...validators: Array<Validator<T>>): Validator<T>`

Groups validators in parallel. The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere). Beware of using processors inside.

```js
import * as v from 'usov';

const unchi = (
  v.withErrors(
    v.parallel(
      v.lte(10, 'ERR1'),
      v.gte(0, 'ERR2'),
      v.integer('ERR3')
    )
  )
);

unchi(10);
// => { result: 10, errors: null }

unchi(-1);
// => { result: null, errors: ['ERR2'] }

unchi(11);
// => { result: null, errors: ['ERR1'] }

unchi(11.2);
// => { result: null, errors: ['ERR1', 'ERR3'] }
```

#### `transform<T, R>(...processors: Array<Processor<T | R, R>>): Processor<T | R, R>`

Groups processors sequentially. Passes value through a sequence of processors. Takes only processors (doesn't check errors).

```js
import * as v from 'usov';

const unchi = (
  v.transform(
    v.round(),
    v.clamp(0, 10)
  )
);

unchi(10.5);
// => 10

unchi(8.3);
// => 8
```

### `Containers`
Embraces validators with additional data processing.
#### `withErrors<T, R>(validator: Processor<T, R>, commonErrorProcessor?: ((meta?: MetaData) => Error)): Processor<T, Result<R>>`

Provides error handling mechanism.

```js
import * as v from 'usov';

const unchi = (
  v.withErrors(
    v.parallel(
      v.lte(10, 'ERR1'),
      v.gte(0, 'ERR2'),
      v.integer('ERR3')
    )
  )
);

unchi(10);
// => { result: 10, errors: null }

unchi(-1);
// => { result: null, errors: ['ERR2'] }

unchi(11);
// => { result: null, errors: ['ERR1'] }

unchi(11.2);
// => { result: null, errors: ['ERR1', 'ERR3'] }
```

#### `withMeta<T, R>(validator: Processor<T, R>): Processor<T, R>`

Provides meta structure.

```js
import * as v from 'usov';

const unchi = (
  v.withErrors(
    v.withMeta( // provides meta object into schema.
      v.parallel(
        v.lte(10, ({ validator }) => validator), // returns validator name as error.
        v.gte(0, ({ validator }) => validator),
        v.integer(({ validator }) => validator)
      )
    )
  )
);

unchi(10);
// => { result: 10, errors: null }

unchi(-1);
// => { result: null, errors: ['gte'] }

unchi(11);
// => { result: null, errors: ['lte'] }

unchi(11.2);
// => { result: null, errors: ['lte', 'integer'] }
```

#### `withPromise<T, R>(validator: Processor<T, R | Result<R>>): Processor<T, Promise<R | Array<Error>>>`

Convert result to promise.

```js
import * as v from 'usov';

const unchi = (
  v.withPromise(
    v.number('ERR')
  )
);

await unchi(10);
// => 10

await unchi('abc'); // error only works with 'withError' container.
// => null

const withErrorUnchi = (
  v.withPromise(
    v.withErrors(
      v.number('ERR')
    )
  )
);

await withErrorUnchi(10);
// => 10

try {
  await withErrorUnchi('abc');
} catch (errors) {
  // => ['ERR']
}
```

### `Spreaders`
Spreads data through a validators scheme. Almost all spreaders requires meta schema to be provided with 'withMeta'.
#### `getDep<T>(field: string, preValidator?: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T>`

Takes value from spreaded structure. Might be used for dynamic validators creation. If 'preValidator' not provided, just replaces current value. Works only with provided meta object.

```js
import * as v from 'usov';

const simpleOne = (
  v.withMeta(
    v.object({
      pass: [v.string(), v.minLen(10), v.setDep('pass')],
      pass2: [v.getDep('pass', (pass: string) => v.equal(pass))] // Compares password and password confirmation
    })
  )
);

simpleOne({ pass: 'YourAwesomePassword', pass2: 'YourAwesomePassword' });
// => { pass: 'YourAwesomePassword', pass2: 'YourAwesomePassword' }

simpleOne({ pass: 'YourAwesomePassword', pass2: 'YourAwesomePass..' });
// => { pass: 'YourAwesomePassword', pass2: null }

simpleOne({ pass: 'Your...', pass2: 'YourAwesomePassword' });
// => { pass: null, pass2: null }
```

#### `setDep<T>(field: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>`

Puts value into spreaded structure. If 'extValue' is provided, puts it instead of current value.

```js
import * as v from 'usov';

v.withMeta( // meta schema required for dependencies.
  v.object({
    id: [v.number(), v.gte(0), v.setDep('id')] // if 'id' is valid, sets 'id' dependency into schema.
  })
);

v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setDep('isIdValid', true)] // custom data for dependency.
  })
);

v.withMeta(
  v.consecutive(
    v.setDep('beforeObjectValidation', true), // non conditional dependency.
    v.object({
      id: [v.number(), v.gte(0)]
    })
  )
);
```

#### `setVDep<T>(field: string, ...validators: Array<Validator<T>>): Validator<T>`

Puts validators into spreaded structure. Might be used for recursive schemes.

```js
import * as v from 'usov';

const recursiveOne = (
  v.withMeta( // meta schema is required.
    v.setVDep('node', // sets validators into meta schema.
      v.object({
        id: [v.number(), v.gte(0)],
        node: v.getDep('node', validators => validators)
      })
    )
  )
);

recursiveOne({ id: 1, node: { id: 2, node: { id: 3, node: { id: 4 } } } });
// => { id: 1, node: { id: 2, node: { id: 3, node: { id: 4, node: null } } } }

recursiveOne({ id: 1, node: { id: -1, node: { id: 3, node: { id: 4 } } } });
// => { id: 1, node: { id: null, node: { id: 3, node: { id: 4, node: null } } } }

recursiveOne({ id: 1, node: { id: -1, node: [1] } });
// => { id: 1, node: { id: null, node: null } }
```

#### `useDefault<T, R>(defaultValue: R | (() => R), ...validators: Array<Processor<T | R, R>>): Processor<T | R, R>`

Puts default value into spreaded structure. If input value is empty, puts default value instead, otherwise validates input values with provided validators.

```js
import * as v from 'usov';

const simpleOne = (
  v.useDefault('default', v.string(), v.minLen(10))
);

simpleOne(null);
// => 'default'

simpleOne('');
// => 'default'

simpleOne('Stringu'); // too short.
// => null

simpleOne('Stringuuuuuuuuuu');
// => 'Stringuuuuuuuuuu'
```

