# `Baridetta`
Baridetta is a javascript universal single object validator. It provides validation and transformation utilities. Each validator is represented by a separated module, thats gives opportunity for treeshaking. Library has 5 types of modules: validators, processors, groupers, spreaders, containers. Each one has own specific behaviour.

You can use validators only for validation and processing data without error handling (e.g. url query params).
Futhermore, you can use containers for error handling and provide your own errors processing.

You can easily extend library with your own specific validators or processors.

Minified library bundle with all modules takes less than 6kb. It doesn't require any external dependency.
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
    - [`Relevance`](#relevance)
    - [`Result`](#result)
    - [`Validator`](#validator)
  - [`Validators`](#validators)
    - [`array<T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, error?: Error): Validator<Array<any>, Array<T>>`](#arraytitemspec-arrayvalidatorany-t--validatorany-t-error-error-validatorarrayany-arrayt)
    - [`bool<T>(error?: Error): Validator<T, boolean>`](#boolterror-error-validatort-boolean)
    - [`empty<T>(error?: Error): Validator<T>`](#emptyterror-error-validatort)
    - [`equal<T>(match: T, error?: Error): Validator<T>`](#equaltmatch-t-error-error-validatort)
    - [`fields<T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T>`](#fieldst-extends-objectlikespec-fieldsspec-error-error-validatort)
    - [`gte<T>(bound: T, error?: Error): Validator<T>`](#gtetbound-t-error-error-validatort)
    - [`integer(error?: Error): Validator<number>`](#integererror-error-validatornumber)
    - [`len<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#lent-extends-lengthylen-number-error-error-validatort)
    - [`lte<T>(bound: T, error?: Error): Validator<T>`](#ltetbound-t-error-error-validatort)
    - [`maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#maxlent-extends-lengthylen-number-error-error-validatort)
    - [`minLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`](#minlent-extends-lengthylen-number-error-error-validatort)
    - [`number<T extends unknown>(error?: Error): Validator<T, number>`](#numbert-extends-unknownerror-error-validatort-number)
    - [`object<T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R>`](#objectt-extends-objectlike-r--tspec-objectspec-error-error-validatort-r)
    - [`object2<T extends ObjectLike, R = T>(spec?: Array<[string, ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R>`](#object2t-extends-objectlike-r--tspec-arraystring-arrayvalidatorany-any-error-error-validatort-r)
    - [`oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>`](#oneoftcandidates-arrayt-error-error-validatort)
    - [`regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>`](#regext-extends-unknownmatch-regexp-error-error-validatort)
    - [`string<T>(error?: Error): Validator<T, string>`](#stringterror-error-validatort-string)
  - [`Processors`](#processors)
    - [`clamp<T>(min: T, max: T): Validator<T, T>`](#clamptmin-t-max-t-validatort-t)
    - [`erase<T>(): Validator<T, null>`](#eraset-validatort-null)
    - [`lowercase(): Validator<string, string>`](#lowercase-validatorstring-string)
    - [`round(method: 'round' | 'floor' | 'ceil' = 'round'): Validator<number, number>`](#roundmethod-round--floor--ceil--round-validatornumber-number)
    - [`uppercase(): Validator<string, string>`](#uppercase-validatorstring-string)
  - [`Groupers`](#groupers)
    - [`consecutive<T>(...validators: Array<Validator<any, T>>): Validator<any, T>`](#consecutivetvalidators-arrayvalidatorany-t-validatorany-t)
    - [`or<T>(...validators: Array<Validator<any, any>>): Validator<any, any>`](#ortvalidators-arrayvalidatorany-any-validatorany-any)
    - [`parallel<T>(...validators: Array<Validator<T>>): Validator<T>`](#paralleltvalidators-arrayvalidatort-validatort)
    - [`transform<T, R>(...processors: Array<Validator<T | R, R>>): Validator<T | R, R>`](#transformt-rprocessors-arrayvalidatort--r-r-validatort--r-r)
  - [`Containers`](#containers)
    - [`withErrors<T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: Error, meta?: MetaData) => Error)): Validator<T, Result<R>>`](#witherrorst-rvalidator-validatort-r-commonerrorprocessor-error-error-meta-metadata--error-validatort-resultr)
    - [`withMeta<T, R>(validator: Validator<T, R>): Validator<T, R>`](#withmetat-rvalidator-validatort-r-validatort-r)
    - [`withPromise<T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Array<Error>>>`](#withpromiset-rvalidator-validatort-r--resultr-validatort-promiser--arrayerror)
  - [`Spreaders`](#spreaders)
    - [`getDep<T>(field: string, preValidator?: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T>`](#getdeptfield-string-prevalidator-dep-t--validatort--arrayvalidatort-validatort)
    - [`setDep<T>(field: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>`](#setdeptfield-string-extvalue-any--value-t-meta-metadata--any-validatort)
    - [`setVDep<T>(field: string, ...validators: Array<Validator<T>>): Validator<T>`](#setvdeptfield-string-validators-arrayvalidatort-validatort)
    - [`useDefault<T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>`](#usedefaultt-rdefaultvalue-r--meta-metadata--r-validators-arrayvalidatort--r-r-validatort--r-r)
- [`Custom validators`](#custom-validators)
  - [`Schema with common error processor`](#schema-with-common-error-processor)
  - [`Fields validation`](#fields-validation)
  - [`Conditional validation`](#conditional-validation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## `Install`
```sh
npm install baridetta
//or
yarn add baridetta
```
## `Usage`
```js
import * as v from 'baridetta'; // for everything (recommended for better minification results e.g. in webpack)
// or
import { number, array } from 'baridetta'; // for only what you need
// or
const { object, setDep } = require('baridetta');
```

```js
import * as v from 'baridetta';

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
type ObjectSpec = Record<string, Array<Validator<any, any>> | Validator<any, any>>;
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
#### `array<T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, error?: Error): Validator<Array<any>, Array<T>>`

Checks value to be an array.

```js
import * as v from 'baridetta';

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

#### `bool<T>(error?: Error): Validator<T, boolean>`

Checks value to be a boolean compatible.

```js
import * as v from 'baridetta';

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

#### `empty<T>(error?: Error): Validator<T>`

Checks value to be empty. Can be inverted with .not call.

```js
import * as v from 'baridetta';

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

v.empty.not()(undefined);
// => null

v.empty.not()(0);
// => 0
```

#### `equal<T>(match: T, error?: Error): Validator<T>`

Checks value to be equal to 'match' param. Requires the same type. Shallow comparison. Can be inverted with .not call.

```js
import * as v from 'baridetta';

v.equal(10)(10);
// => 10

v.equal('10')(10 as any);
// => null

v.equal([1, 2, 3])([1, 2, 3]); // it's not a deep equality. Only checks links.
// => null

v.equal.not(10)(10);
// => null

v.equal.not(10)(1);
// => 1
```

#### `fields<T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T>`

Checks for fields in the input object.

```js
import * as v from 'baridetta';

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
import * as v from 'baridetta';

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

v.gte(new Date())(new Date(Date.now() + 1000));
// => Date

v.gte(new Date())(new Date(Date.now() - 1000));
// => null
```

#### `integer(error?: Error): Validator<number>`

Checks number to be an integer. Can be inverted with .not call.

```js
import * as v from 'baridetta';

v.integer()(1);
// => 1

v.integer()(1.1);
// => null

v.integer()('1' as any); // requires a number.
// => null

v.integer.not()(1);
// => null

v.integer.not()(1.1);
// => 1.1
```

#### `len<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like. Can be inverted with .not call.

```js
import * as v from 'baridetta';

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

v.len.not(3)([0, 1, 2]);
// => null

v.len.not(3)('abc');
// => null

v.len.not(3)([0, 1, 2, 3]);
// => [0, 1, 2, 3]

v.len.not(3)('abcd');
// => 'abcd'
```

#### `lte<T>(bound: T, error?: Error): Validator<T>`

Checks value to be lower or equal to 'match' param. Requires the same type.

```js
import * as v from 'baridetta';

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

v.lte(new Date())(new Date(Date.now() - 1000));
// => Date

v.lte(new Date())(new Date(Date.now() + 1000));
// => null
```

#### `maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>`

Checks length to be equal to 'len' param. Requires to be object like.

```js
import * as v from 'baridetta';

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
import * as v from 'baridetta';

v.minLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.minLen(3)([0, 1]);
// => null

v.minLen(3)('abc');
// => 'abc'

v.minLen(3)({ length: 3 });
// => { length: 3 }
```

#### `number<T extends unknown>(error?: Error): Validator<T, number>`

Checks value to be a number compatible.

```js
import * as v from 'baridetta';

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

#### `object<T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R>`

Checks value to be an object.

```js
import * as v from 'baridetta';

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

#### `object2<T extends ObjectLike, R = T>(spec?: Array<[string, ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R>`

Checks value to be an object.

```js
import * as v from 'baridetta';

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

Checks value to be one of expected. Shallow comparison. Can be inverted with .not call.

```js
import * as v from 'baridetta';

v.oneOf([0, 1, 2])(1);
// => 1

v.oneOf([0, 1, 2])(3);
// => null

v.oneOf([0, 1, [1]])([1]); // not a deep equality.
// => null

v.oneOf.not([0, 1, 2])(1);
// => null

v.oneOf.not([0, 1, 2])(3);
// => 3
```

#### `regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>`

Checks value to match a pattern. Can be inverted with .not call.

```js
import * as v from 'baridetta';

v.regex(/^[0-9]$/)(1);
// => 1

v.regex(/^[0-9]$/)(11);
// => null

v.regex.not(/^[0-9]$/)(1);
// => null

v.regex(/^[0-9]$/)(11);
// => 11
```

#### `string<T>(error?: Error): Validator<T, string>`

Checks value to be a string compatible.

```js
import * as v from 'baridetta';

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
#### `clamp<T>(min: T, max: T): Validator<T, T>`

Clamps value to required boundaries.

```js
import * as v from 'baridetta';

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

#### `erase<T>(): Validator<T, null>`

Erase input.

```js
import * as v from 'baridetta';

v.erase()(2);
// => null
```

#### `lowercase(): Validator<string, string>`

Lowercase input string.

```js
import * as v from 'baridetta';

v.lowercase()('ABC');
// => 'abc'
```

#### `round(method: 'round' | 'floor' | 'ceil' = 'round'): Validator<number, number>`

Round input number with specific method.

```js
import * as v from 'baridetta';

v.round()(10);
// => 10

v.round()(10.2);
// => 10

v.round()(9.8);
// => 10

v.round('floor')(10);
// => 10

v.round('floor')(10.2);
// => 10

v.round('floor')(9.8);
// => 9

v.round('ceil')(10);
// => 10

v.round('ceil')(10.2);
// => 11

v.round('ceil')(9.8);
// => 10
```

#### `uppercase(): Validator<string, string>`

Uppercase input string.

```js
import * as v from 'baridetta';

v.uppercase()('abc');
// => 'ABC'
```

### `Groupers`
Groups validators in a specific way.
#### `consecutive<T>(...validators: Array<Validator<any, T>>): Validator<any, T>`

Groups validators sequentially. Passes value through a sequence of validators until an error occurs. Uses by default in 'object' and 'object2' validator's scheme for fields.

```js
import * as v from 'baridetta';

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

#### `or<T>(...validators: Array<Validator<any, any>>): Validator<any, any>`

Groups validators sequentially. Searches for first successful validator's result.

```js
import * as v from 'baridetta';

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
import * as v from 'baridetta';

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

#### `transform<T, R>(...processors: Array<Validator<T | R, R>>): Validator<T | R, R>`

Groups processors sequentially. Passes value through a sequence of processors. Takes only processors (doesn't check errors).

```js
import * as v from 'baridetta';

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
#### `withErrors<T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: Error, meta?: MetaData) => Error)): Validator<T, Result<R>>`

Provides error handling mechanism.

```js
import * as v from 'baridetta';

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

#### `withMeta<T, R>(validator: Validator<T, R>): Validator<T, R>`

Provides meta structure.

```js
import * as v from 'baridetta';

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

#### `withPromise<T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Array<Error>>>`

Convert result to promise. Use it for async validation.

```js
import * as v from 'baridetta';

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
import * as v from 'baridetta';

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
import * as v from 'baridetta';

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
import * as v from 'baridetta';

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

#### `useDefault<T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>`

Puts default value into spreaded structure. If input value is empty, puts default value instead, otherwise validates input values with provided validators.

```js
import * as v from 'baridetta';

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

## `Custom validators`
You can create your own validator or processor.

Base validator template:
```js
yourValidatorName(...yourProbableParams: Array<any>, error?: Error): Validator<any> =>
  (
    (value: any, onError?: ErrorCallback, meta?: MetaData): any =>
      (
        ... check input value
      )
        ? value : (onError && onError(error, meta), null)
  );
```

Simple example:
```js
const gte = (bound: number, error?: Error): Validator<number> =>
  (
    (value: number, onError?: ErrorCallback, meta?: MetaData): number =>
      (
        value >= bound
      )
        ? value : (onError && onError(error, meta), null)
  );
```

You must provide validator name and params into meta scheme for proper errors handling.
```js
... onError(error, meta && { ...meta, validator: 'name', params: [... your params] }) ...
```

Processor injection example:
```js
import * as v from 'baridetta';

const simpleOne = (
  v.consecutive(
    v.array([
      v.number(),
      v.gte(0)
    ]),
    (data: Array<number>) => data.filter(value => !!value) // Remove null values.
  )
);
## `Examples`
All examples use advanced object schema 'object2' as recommended solution.

### `Schema with custom user errors`

Custom error on each validator:
```js
v.withErrors(
  v.object2([
    ['id',
      v.empty.not('Empty id'),
      v.number('Not a number'),
      v.parallel(
        v.gte(0, 'Must not be negative'),
        v.integer('Must be an integer')
      )
    ],
    ['name',
      v.empty.not('Empty name'),
      v.string(),
      v.minLen(10, 'Min length is 10')
    ]
  ])
)
```

### `Schema with common error processor`

Each error will be represented as `{ path, validator, error }`:
```js
v.withErrors(
  v.object2([
    ['id',
      v.empty.not(),
      v.number('Custom error message'), // wanna add some info for common error processor?
      v.parallel(
        v.gte(0),
        v.integer()
      )
    ],
    ['name',
      v.empty.not(),
      v.string(),
      v.minLen(10)
    ]
  ]), (error, { path, validator }) => ({ path, validator, error }) // catches all errors in the schema.
)
```

### `Fields validation`

Before validation checks required fields existence:
```js
v.consecutive(
  v.fields(['&', ['^', 'id', 'guid'], 'login']),
  v.object2([
    ['id', v.number(), v.gte(0)],
    ['guid', v.string(), v.len(36)],
    ['login', v.string(), v.minLen(10)]
  ])
)
```

### `Conditional validation`

Id can be an integer or a GUID:
```js
v.object2([
  ['id', v.or(
    v.consecutive(v.number(), v.integer(), v.gte(0)),
    v.consecutive(v.string(), v.len(36)) // !notice: prefer to use 'regex' for GUID validation.
  )],
  ['name', v.string(), v.minLen(10)]
])
```

Conditional validators usage
```js
v.withMeta(
  v.object2([
    ['id', v.number(), v.gte(0), v.setDep('isIdValid', true)],
    ['name', getDep(
      'isIdValid',
      (isIdValid: boolean) => isIdValid && [v.string(), v.minLen(10)]
    )]
  ])
)
```

Array with custom processor injection
```js
v.consecutive(
  v.array(
    v.object2([
      ['id', v.number(), v.gte(0)],
      ['name', v.string(), v.minLen(10), v.regex.not(/invalid_name_regex/)]
    ])
  ),
  (data: Array<number>) => data.filter(value => !!value)
)
```
