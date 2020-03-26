# `Uvo`
Uvo is a javascript universal single object validator. It provides validation and transformation utilities. Each validator is represented by a separated module, thats gives opportunity for treeshaking. Library has 5 types of modules: validators, processors, groupers, spreaders, containers. Each one has own specific behaviour.

You can use validators only for validation and processing data without error handling (e.g. url query params).
Futhermore, you can use containers for error handling and provide your own errors processing.

You can easily extend library with your own specific validators or processors.

Minified library bundle with all modules takes less than 8kb. It doesn't require any external dependency.
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
    - [`array`](#array)
    - [`bool <checkable>`](#bool-checkable)
    - [`date <checkable>`](#date-checkable)
    - [`defined`](#defined)
    - [`empty <invertible>`](#empty-invertible)
    - [`equal <invertible>`](#equal-invertible)
    - [`even <invertible>`](#even-invertible)
    - [`fields`](#fields)
    - [`gte <invertible>`](#gte-invertible)
    - [`integer <invertible>`](#integer-invertible)
    - [`is`](#is)
    - [`length <invertible>`](#length-invertible)
    - [`lte <invertible>`](#lte-invertible)
    - [`maxLen <invertible>`](#maxlen-invertible)
    - [`minLen <invertible>`](#minlen-invertible)
    - [`multiple <invertible>`](#multiple-invertible)
    - [`number <checkable>`](#number-checkable)
    - [`object`](#object)
    - [`object2`](#object2)
    - [`oneOf <invertible>`](#oneof-invertible)
    - [`regex <invertible>`](#regex-invertible)
    - [`string <checkable>`](#string-checkable)
    - [`unique`](#unique)
  - [`Processors`](#processors)
    - [`clamp`](#clamp)
    - [`erase`](#erase)
    - [`keysMap`](#keysmap)
    - [`lowercase`](#lowercase)
    - [`random`](#random)
    - [`round`](#round)
    - [`strip`](#strip)
    - [`trim`](#trim)
    - [`uppercase`](#uppercase)
    - [`valueMap`](#valuemap)
  - [`Groupers`](#groupers)
    - [`consecutive`](#consecutive)
    - [`or`](#or)
    - [`parallel`](#parallel)
    - [`transform`](#transform)
  - [`Containers`](#containers)
    - [`withErrors`](#witherrors)
    - [`withFallback`](#withfallback)
    - [`withMeta`](#withmeta)
    - [`withOnError`](#withonerror)
    - [`withPromise`](#withpromise)
  - [`Spreaders`](#spreaders)
    - [`dynamic`](#dynamic)
    - [`getDep`](#getdep)
    - [`setDep`](#setdep)
    - [`setVDep`](#setvdep)
    - [`useDefault`](#usedefault)
- [`Templating (alpha)`](#templating-alpha)
- [`Custom validators`](#custom-validators)
- [`Examples`](#examples)
  - [`Schema with custom user errors`](#schema-with-custom-user-errors)
  - [`Schema with common error processor`](#schema-with-common-error-processor)
  - [`Fields validation`](#fields-validation)
  - [`Conditional validation`](#conditional-validation)
  - [`Injections`](#injections)
  - [`Fields strip`](#fields-strip)
  - [`Keys transformations`](#keys-transformations)
  - [`Custom value mapping`](#custom-value-mapping)
  - [`Multiple validations`](#multiple-validations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## `Install`
```sh
npm install uvo
//or
yarn add uvo
```
## `Usage`
```js
import * as v from 'uvo'; // for everything (recommended for better minification results e.g. in webpack)
// or
import { number, array } from 'uvo'; // for only what you need
// or
const { object, setDep } = require('uvo');
```

```js
import * as v from 'uvo';

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


Any type's error.  Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.

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
#### `array`

```js
// scheme
array<T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, error?: Error): Validator<Array<any>, Array<T>>
```
Checks value to be an array.

```js
import * as v from 'uvo';

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

#### `bool <checkable>`

```js
// scheme
bool<T>(error?: Error): Validator<T, boolean>
```
Checks value to be a boolean compatible.

```js
import * as v from 'uvo';

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

v.bool.check()(true);
// => true

v.bool.check()(1);
// => 1

v.bool.check()('abc');
// => null
```

#### `date <checkable>`

```js
// scheme
date<T>(error?: Error): Validator<T, number>
```
Checks value to be a date compatible. Result in ms.

```js
import * as v from 'uvo';

v.date()('12.12.2020');
// => 1607720400000

v.date()([12, 12, 2020]);
// => 1607720400000

v.date()('99.12.2020');
// => null

v.date.check()('12.12.2020');
// => '12.12.2020'

v.date.check()('99.12.2020');
// => null
```

#### `defined`

```js
// shortcut to
is(value => value !== undefined)

// scheme
defined<T>(error?: Error): Validator<T>
```
Checks value to be defined.

```js
import * as v from 'uvo';

v.defined()(null);
// => null

v.defined()(undefined);
// => null

v.defined()('');
// => ''

v.defined()(true);
// => true
```

#### `empty <invertible>`

```js
// shortcut to
is(value => [null, undefined, ''].indexOf(value) >= 0)

// scheme
empty<T>(error?: Error): Validator<T>
```
Checks value to be empty.

```js
import * as v from 'uvo';

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

#### `equal <invertible>`

```js
// shortcut to
is(value => value === match)

// scheme
equal<T>(match: T, error?: Error): Validator<T>
```
Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.

```js
import * as v from 'uvo';

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

#### `even <invertible>`

```js
// shortcut to
is(value => value % 2 === 0)

// scheme
even(error?: Error): Validator<number>
```
Checks number to be an even one.

```js
import * as v from 'uvo';

v.even()(1);
// => null

v.even()(2);
// => 2

v.even()(2.1);
// => null

v.even.not()(1);
// => 1

v.even.not()(2);
// => null
```

#### `fields`

```js
// scheme
fields<T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T>
```
Checks for fields in the input object.

```js
import * as v from 'uvo';

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

#### `gte <invertible>`

```js
// shortcut to
is(value => value >= bound)

// scheme
gte<T>(bound: T, error?: Error): Validator<T>
```
Checks value to be greater or equal to 'bound' param. Requires the same type.

```js
import * as v from 'uvo';

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

v.gte.not(0)(1);
// => null

v.gte.not('0')('1');
// => null

v.gte.not(false)(true);
// => null

v.gte.not(0)(-1);
// => -1
```

#### `integer <invertible>`

```js
// shortcut to
is(value => value % 1 === 0)

// scheme
integer(error?: Error): Validator<number>
```
Checks number to be an integer.

```js
import * as v from 'uvo';

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

#### `is`

```js
// scheme
is<T>(comparator: ((value: T) => boolean), error?: Error): Validator<T>
```
Checks value with custom comparator.

```js
import * as v from 'uvo';

v.is((value: number) => value === 10)(10);
// => 10

v.is((value) => value === 10)('10');
// => null
```

#### `length <invertible>`

```js
// shortcut to
is(value => value.length === len)

// scheme
length<T extends Lengthy>(len: number, error?: Error): Validator<T>
```
Compares length with 'len' param. Requires to be an object like or string.

```js
import * as v from 'uvo';

v.length(3)([0, 1, 2]);
// => [0, 1, 2]

v.length(3)('abc');
// => 'abc'

v.length(3)({ length: 3 });
// => { length: 3 }

v.length(3)(10 as any);
// => null

v.length(3)({ length: '3' } as any); // length is not a number.
// => null

v.length.not(3)([0, 1, 2]);
// => null

v.length.not(3)('abc');
// => null

v.length.not(3)([0, 1, 2, 3]);
// => [0, 1, 2, 3]

v.length.not(3)('abcd');
// => 'abcd'
```

#### `lte <invertible>`

```js
// shortcut to
is(value => value <= bound)

// scheme
lte<T>(bound: T, error?: Error): Validator<T>
```
Checks value to be lower or equal to 'bound' param. Requires the same type.

```js
import * as v from 'uvo';

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

v.lte.not(2)(1);
// => null

v.lte.not('2')('1');
// => null

v.lte.not(true)(true);
// => null

v.lte.not(0)(1);
// => 1
```

#### `maxLen <invertible>`

```js
// shortcut to
is(value => value.length >= len)

// scheme
maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>
```
Checks length to be equal to 'len' param. Requires to be an object like or string.

```js
import * as v from 'uvo';

v.maxLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.maxLen(3)([0, 1, 2, 3]);
// => null

v.maxLen(3)('abc');
// => 'abc'

v.maxLen(3)({ length: 3 });
// => { length: 3 }
```

#### `minLen <invertible>`

```js
// shortcut to
is(value => value.length <= len)

// scheme
minLen<T extends Lengthy>(len: number, error?: Error): Validator<T>
```
Checks length to be equal to 'len' param. Requires to be an object like or string.

```js
import * as v from 'uvo';

v.minLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.minLen(3)([0, 1]);
// => null

v.minLen(3)('abc');
// => 'abc'

v.minLen(3)({ length: 3 });
// => { length: 3 }
```

#### `multiple <invertible>`

```js
// shortcut to
is(value => value % multiplier === 0)

// scheme
multiple(multiplier: number, error?: Error): Validator<number>
```
Checks number to be an integer.

```js
import * as v from 'uvo';

v.multiple(1)(1); // integer
// => 1

v.multiple(1)(1.1);
// => null

v.multiple(2)(2);
// => 2

v.multiple(2)(3);
// => null

v.multiple.not(3)(12);
// => null

v.multiple.not(3)(11);
// => 11
```

#### `number <checkable>`

```js
// scheme
number<T>(error?: Error): Validator<T, number>
```
Checks value to be a number compatible.

```js
import * as v from 'uvo';

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

v.number.check()(10);
// => 10

v.number.check()('10');
// => '10'

v.number.check()('true');
// => null
```

#### `object`

```js
// scheme
object<T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R>
```
Checks value to be an object.

```js
import * as v from 'uvo';

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
  role: 'invalidRole', // wrong. Will be null
  status: 0 // will be skipped in output.
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }

simpleObj([]);
// => null

simpleObj(10 as any);
// => null

const fieldsKeeper = (
  v.object({
    id: [], // just takes input value.
    name: []
  })
);

fieldsKeeper({
  id: 3,
  name: 'YourAwesomeUserName',
  role: 'invalidRole',
  status: 0
});
// => { id: 3, name: 'YourAwesomeUserName' }
```

#### `object2`

```js
// scheme
object2<T extends ObjectLike, R = T>(spec?: Array<[string | RegEx, ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R>
```
Checks value to be an object. Provides strict ordering. Each key can be a Regex.

```js
import * as v from 'uvo';

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
  role: 'invalidRole', // wrong. Will be null
  status: 0 // will be skipped in output.
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }

simpleObj([]);
// => null

simpleObj(10 as any);
// => null

const fieldsKeeper = (
  v.object2([
    ['id'], // just takes input value.
    ['name']
  ])
);

fieldsKeeper({
  id: 3,
  name: 'YourAwesomeUserName',
  role: 'invalidRole',
  status: 0
});
// => { id: 3, name: 'YourAwesomeUserName' }

const advancedObj = (
  v.object2([
    ['id', v.number(), v.gte(0)],
    [/name|surname|thirdname/, v.string(), v.minLen(10)] // use regex for fields matching.
  ])
);

advancedObj({
  id: 3,
  name: 'YourAwesomeUserName',
  surname: 'YourAwesomeUserSurname',
  thirdname: 'YourAwesomeUserThirdname'
});
// => { id: 3, name: 'YourAwesomeUserName', surname: 'YourAwesomeUserSurname', thirdname: 'YourAwesomeUserThirdname' }
```

#### `oneOf <invertible>`

```js
// shortcut to
is(value => candidates.indexOf(value) >= 0)

// scheme
oneOf<T>(candidates: Array<T> | string, error?: Error): Validator<T>
```
Checks value to be one of expected. Shallow comparison.

```js
import * as v from 'uvo';

v.oneOf([0, 1, 2])(1);
// => 1

v.oneOf('012')(1);
// => 1

v.oneOf([0, 1, 2])(3);
// => null

v.oneOf([0, 1, [1]])([1]); // not a deep equality.
// => null

v.oneOf.not([0, 1, 2])(1);
// => null

v.oneOf.not([0, 1, 2])(3);
// => 3

v.oneOf.not('abcdefg')('f');
// => null
```

#### `regex <invertible>`

```js
// shortcut to
is(value => match.test(value))

// scheme
regex<T>(match: RegExp, error?: Error): Validator<T>
```
Checks value to match a pattern.

```js
import * as v from 'uvo';

v.regex(/^[0-9]$/)(1);
// => 1

v.regex(/^[0-9]$/)(11);
// => null

v.regex.not(/^[0-9]$/)(1);
// => null

v.regex(/^[0-9]$/)(11);
// => 11
```

#### `string <checkable>`

```js
// scheme
string<T>(error?: Error): Validator<T, string>
```
Checks value to be a string compatible.

```js
import * as v from 'uvo';

v.string()(1);
// => '1'

v.string()('1');
// => '1'

v.string()(true);
// => 'true'

v.string()([1, 2]);
// => null

v.string.check()(1);
// => 1

v.string.check()('1');
// => '1'

v.string.check()([1, 2]);
// => null
```

#### `unique`

```js
// scheme
array<T>(field?: string | number | ((value: T) => any), error?: Error): Validator<Array<T>>
```
Checks array's elements to be unique.

```js
import * as v from 'uvo';

const objValidator = (
  v.withMeta(
    v.withErrors(
      v.consecutive(
        v.array(v.object2()),
        v.unique('id', (meta: MetaData) => meta.path.join('.'))
      )
    )
  )
);

objValidator([{ id: 1 }, { id: 2 }, { id: 3 }]);
// => { result: [{ id: 1 }, { id: 2 }, { id: 3 }], errors: null }

objValidator([{ id: 1 }, { id: 2 }, { id: 1 }]);
// => { result: [{ id: 1 }, { id: 2 }, null], errors: ['2.id'] }

objValidator([{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }]);
// => { result: [{ id: 1 }, { id: 2 }, null, null], errors: ['2.id', '3.id'] }

const validator = (
  v.withMeta(
    v.withErrors(
      v.consecutive(
        v.array(v.number()),
        v.unique(null, (meta: MetaData) => meta.path.join('.'))
      )
    )
  )
);

validator([1, 2, 3]);
// => { result: [1, 2, 3], errors: null }

validator([{ id: 1 }, { id: 2 }, { id: 1 }]);
// => { result: [1, 2, null], errors: ['2'] }

validator([1, 2, 1, 2]);
// => { result: [1, 2, null, null], errors: ['2', '3'] }
```

### `Processors`
Processes input value. No input types check. Recommended to use validators before.
#### `clamp`

```js
// scheme
clamp<T>(min: T, max: T): Validator<T, T>
```
Clamps value to required boundaries.

```js
import * as v from 'uvo';

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

#### `erase`

```js
// scheme
erase<T>(): Validator<T, null>
```
Erase input.

```js
import * as v from 'uvo';

v.erase()(2);
// => null
```

#### `keysMap`

```js
// scheme
keysMap<T extends ObjectLike>(mapper: (key: string) => string): Validator<T, T>
```
Maps object keys with custom mapper.

```js
import * as v from 'uvo';

v.keysMap((key: string) => `_${key}`)({ f1: 'abc', f2: 10 });
// => { _f1: 'abc', _f2: 10 }

v.keysMap((key: string) => key.toUpperCase())({ f1: 'abc', f2: 10 });
// => { F1: 'abc', F2: 10 }

v.keysMap((key: string) => key === 'f1' ? 'f2' : key)({ f1: 'abc' }); // moves/renames field
// => { f2: 'abc' }
```

#### `lowercase`

```js
// scheme
lowercase(): Validator<string, string>
```
Lowercase input string.

```js
import * as v from 'uvo';

v.lowercase()('ABC');
// => 'abc'
```

#### `random`

```js
// scheme
random(min: number, max: number, precision: number): Validator<any, number>
```
Returns random value according to params.

```js
import * as v from 'uvo';

v.random()(null);
// => in [0...1]

v.random(5, 10)(null);
// => in [5...10]

v.random(5, 10, 0)(null);
// => in [5, 6, 7, 8, 9, 10]

v.random(0, 1, 0)(null);
// => in [0, 1]
```

#### `round`

```js
// scheme
round(method?: 'floor' | 'ceil'): Validator<number, number>
```
Round input number with specific method.

```js
import * as v from 'uvo';

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

#### `strip`

```js
// scheme
strip<T extends ObjectLike, K>(field: string | RegExp, condition: boolean | ((value: K) => boolean) = true): Validator<T, T>
```
Removes field from object conditionally.

```js
import * as v from 'uvo';

v.strip('f1')({ f1: 'abc', f2: 10 });
// => { f2: 10 }

v.strip('f1', false)({ f1: 'abc', f2: 10 });
// => { f1: 'abc', f2: 10 }

v.strip('f1', (value: string) => value === 'abc')({ f1: 'abc', f2: 10 });
// => { f2: 10 }

v.strip('f1', (value: string) => value === 'a')({ f1: 'abc', f2: 10 });
// => { f1: 'abc', f2: 10 }

v.strip(/f1|f2/, (value: any) => value === null)({ f1: null, f2: 10 });
// => { f2: 10 }

v.strip(/f1|f2/, (value: any) => value === null)({ f1: null, f2: null });
// => {}

v.strip(/f1|f2/)({ f1: 10, f2: 'abc' });
// => {}
```

#### `trim`

```js
// scheme
trim(method?: 'left' | 'right'): Validator<string, string>
```
Trim input string with specific method.

```js
import * as v from 'uvo';

v.trim()(' abc ');
// => 'abc'

v.trim('left')(' abc ');
// => 'abc '

v.trim('right')(' abc ');
// => ' abc'
```

#### `uppercase`

```js
// scheme
uppercase(): Validator<string, string>
```
Uppercase input string.

```js
import * as v from 'uvo';

v.uppercase()('abc');
// => 'ABC'
```

#### `valueMap`

```js
// scheme
valueMap<T, R>(...mappers: Array<[Primitive | ((value: T) => boolean) | RegExp, Primitive | ((value: T) => R)]>): Validator<T, R>
```
Maps value with custom mappers.

```js
import * as v from 'uvo';

v.valueMap(['yes', true], ['no', false])('yes');
// => true

v.valueMap(['yes', true], ['no', false])(true);
// => true

v.valueMap(['yes', true], ['no', false])('nope');
// => 'nope'

v.valueMap(['yes', true], [(value: string) => ['no', 'nope'].includes(value), false])('nope');
// => false

v.valueMap(['yes', true], [/no|nope/, false])('nope');
// => false

v.valueMap(['yes', true], [/no|nope/, (value: string) => `${value}?`])('nope');
// => 'nope?'
```

### `Groupers`
Groups validators in a specific way.
#### `consecutive`

```js
// scheme
consecutive<T>(...validators: Array<Validator<any, T>>): Validator<any, T>
```
Groups validators sequentially. Passes value through a sequence of validators until an error occurs. Uses by default in 'object' and 'object2' validator's scheme for fields.

```js
import * as v from 'uvo';

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

#### `or`

```js
// scheme
or<T>(...validators: Array<Validator<any, any>>): Validator<any, any>
```
Groups validators sequentially. Searches for first successful validator's result.

```js
import * as v from 'uvo';

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

#### `parallel`

```js
// scheme
parallel<T>(...validators: Array<Validator<T>>): Validator<T>
```
Groups validators in parallel. The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere). Beware of using processors inside.

```js
import * as v from 'uvo';

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

#### `transform`

```js
// scheme
transform<T, R>(...processors: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Groups processors sequentially. Passes value through a sequence of processors. Takes only processors (doesn't check errors).

```js
import * as v from 'uvo';

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

const niUnchi = (
  v.transform((value: any) => value + 1) // custom transform.
);

niUnchi(10.5);
// => 11.5

niUnchi(8.3);
// => 9.3
```

### `Containers`
Embraces validators with additional data processing.
#### `withErrors`

```js
// scheme
withErrors<T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: Error, meta?: MetaData) => Error)): Validator<T, Result<R>>
```
Provides error handling mechanism.

```js
import * as v from 'uvo';

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

#### `withFallback`

```js
// scheme
withFallback<T, R>(fallback: R | ((initialValue: T, meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Provides fallback value on error.

```js
import * as v from 'uvo';

const simpleOne = (
  v.withFallback('fallback', v.string(), v.minLen(10))
);

simpleOne(null);
// => 'fallback'

simpleOne('');
// => 'fallback'

simpleOne('Stringu'); // too short.
// => 'fallback'

simpleOne('Stringuuuuuuuuuu');
// => 'Stringuuuuuuuuuu'
```

#### `withMeta`

```js
// scheme
withMeta<T, R>(validator: Validator<T, R>): Validator<T, R>
```
Provides meta structure.

```js
import * as v from 'uvo';

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

#### `withOnError`

```js
// scheme
withOnError<T, R>(errorProcessor: ErrorCallback, ...validators: Array<Validator<any, T>>): Validator<T, R>
```
Provides custom error handler.

```js
import * as v from 'uvo';

const unchi = (
  v.withOnError(
    (error) => { console.error(error); },
    v.parallel(
      v.lte(10, 'ERR1'),
      v.gte(0, 'ERR2'),
      v.integer('ERR3')
    )
  )
);

unchi(10);
// => 10

unchi(-1);
// => null
// console.error => 'ERR2'

unchi(11);
// => null
// console.error => 'ERR1'

unchi(11.2);
// => null
// console.error => 'ERR1'
// console.error => 'ERR3'
```

#### `withPromise`

```js
// scheme
withPromise<T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Array<Error>>>
```
Convert result to promise. Use it for async validation.

```js
import * as v from 'uvo';

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
#### `dynamic`

```js
// scheme
dynamic<T>(preValidator: () => Validator<T> | Array<Validator<T>>): Validator<T>
```
Inserts new validators into scheme dynamically.

```js
import * as v from 'uvo';

const validateNumbers = true; // external condition.

v.consecutive(
  v.number(),
  v.dynamic(() => validateNumbers && [ // validate on condition.
    v.gte(0),
    v.integer()
  ])
);

v.consecutive(
  v.date(),
  v.dynamic(() => [
    v.gte(Date.now()) // Compare with current date.
  ])
);
```

#### `getDep`

```js
// scheme
getDep<T>(field: string, preValidator?: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T>
```
Takes value from spreaded structure. Might be used for dynamic validators creation. If 'preValidator' not provided, just replaces current value. Works only with provided meta object.

```js
import * as v from 'uvo';

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

#### `setDep`

```js
// scheme
setDep<T>(field: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>
```
Puts value into spreaded structure. If 'extValue' is provided, puts it instead of current value.

```js
import * as v from 'uvo';

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

#### `setVDep`

```js
// scheme
setVDep<T>(field: string, ...validators: Array<Validator<T>>): Validator<T>
```
Puts validators into spreaded structure. Might be used for recursive schemes.

```js
import * as v from 'uvo';

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

#### `useDefault`

```js
// scheme
useDefault<T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Puts default value into spreaded structure. If input value is empty, puts default value instead, otherwise validates input values with provided validators. If you need fallback value on error use 'withFallback' container instead.

```js
import * as v from 'uvo';

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

## `Templating (alpha)`
New templating api provides string based validators creation.

Apis: `object`, `array`, `number`, `string`, `bool`, `date`, `compare` and `length`.

Comparators for `length` and `compare`: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)

```js
import { template } from 'uvo';

const validator = template(`
  [object( 
    [id : number : compare(>0) : compare(<=100)]
    [name : string : length(>=10)]
    [roles : array(
      [string : length(<8)]
    )]
  )]
`);

validator({ id: 1, name: 'MasterSais', roles: ['Admin'] });
// => { id: 1, name: 'MasterSais', roles: ['Admin'] }

validator({ id: -1, name: 'Master' });
// => { id: null, name: null, roles: null }

validator({ id: -1, name: 'Master', roles: ['NotAdmin'] });
// => { id: null, name: null, roles: [null] }
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
import * as v from 'uvo';

const simpleOne = (
  v.consecutive(
    v.array([
      v.number(),
      v.gte(0)
    ]),
    (data: Array<number>) => data.filter(value => !!value) // Remove null values.
  )
);
```
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
    ['guid', v.string(), v.length(36)],
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
    v.consecutive(v.string(), v.length(36)) // !notice: prefer to use 'regex' for GUID validation.
  )],
  ['name', v.string(), v.minLen(10)]
])
```

Conditional validators usage
```js
v.withMeta( // for deps api.
  v.object2([
    ['id', v.number(), v.gte(0), v.setDep('isIdValid', true)],
    ['name', getDep(
      'isIdValid',
      (isIdValid: boolean) => isIdValid && [v.string(), v.minLen(10)]
    )]
  ])
)
```

### `Injections`

Array with custom processor injection
```js
v.consecutive( // groups validators.
  v.array(
    v.object2([
      ['id', v.number(), v.gte(0)],
      ['name', v.string(), v.minLen(10), v.regex.not(/invalid_name_regex/)]
    ])
  ),
  (data: Array<number>) => data.filter(value => !!value)
)
```

### `Fields strip`

Removes unnecessary fields
```js
v.consecutive( // groups validators.
  v.object2([
    ['id', v.number(), v.integer(), v.gte(0)],
    ['name', v.string(), v.minLen(10)],
    [/createdAt|updatedAt/, v.date()]
  ]),
  v.strip('role'), // just removes one field.
  v.strip('address', (address: string) => address === null), // removes if empty.
  v.strip(/createdAt|updatedAt/, () => (/* condition */)), // removes matched fields conditionally.
)
```

### `Keys transformations`

Camelize object fields
```js
v.consecutive( // groups validators.
  v.object2([
    ['--id--', v.number(), v.integer(), v.gte(0)],
    ['--name--', v.string(), v.minLen(10)]
  ]),
  v.keysMap(_.camelCase) // e.g. using lodash
)
```

### `Custom value mapping`

Maps 'yes' and 'no' on boolean
```js
v.object2([
  ['id', v.number(), v.integer(), v.gte(0)],
  ['name', v.string(), v.minLen(10)],
  ['disabled', 
    v.valueMap(['yes', true], ['no', false]), // converts specific value to type compatible value.
    v.bool() // just check and cast another boolean compatible values.
  ]
])
```

### `Multiple validations`

Validate field two or more times
```js
v.withMeta( // for deps api.
  v.object2([
    [/createdAt|updatedAt|deletedAt/, v.date()],
    ['createdAt', v.setDep('createdAt')],
    ['updatedAt', 
      v.getDep('createdAt', createdAt => createdAt && v.gte(createdAt)), // updatedAt >= createdAt.
      v.setDep('updatedAt')
    ],
    ['deletedAt', 
      v.getDep('updatedAt', updatedAt => updatedAt && v.gte(updatedAt)), // deletedAt >= updatedAt.
    ],
    [/createdAt|updatedAt|deletedAt/, date => date && new Date(date).toLocaleDateString()], // finally format all dates.
  ])
)
```
