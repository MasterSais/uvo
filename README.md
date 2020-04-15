# `Uvo`
Uvo is a javascript universal single object validator. It provides validation and transformation utilities. Each validator is represented by a separated module, thats gives opportunity for treeshaking. Library has 5 types of modules: validators, processors, groupers, spreaders, containers. Each one has own specific behaviour.

You can use validators only for validation and processing data without error handling (e.g. url query params).
Futhermore, you can use containers for error handling and provide your own errors processing.

You can easily extend library with your own specific validators or processors.

Minified library bundle with all modules takes less than 8kb. It doesn't require any external dependency.
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [`Install`](#install)
- [`Classic API`](#classic-api)
  - [`Usage`](#usage)
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
  - [`Logs`](#logs)
  - [`Custom validators`](#custom-validators)
  - [`Examples`](#examples)
  - [`Types`](#types)
    - [`ErrorCallback`](#errorcallback)
    - [`Error`](#error)
    - [`FieldsSpec`](#fieldsspec)
    - [`MetaData`](#metadata)
    - [`ObjectSpec`](#objectspec)
    - [`Relevance`](#relevance)
    - [`Result`](#result)
    - [`Validator`](#validator)
- [`Templating API (beta)`](#templating-api-beta)
  - [`Usage`](#usage-1)
  - [`Keys`](#keys)
    - [`array`](#array-1)
    - [`bool`](#bool)
    - [`compare`](#compare)
    - [`containers`](#containers)
    - [`date`](#date)
    - [`errors`](#errors)
    - [`injection`](#injection)
    - [`length`](#length)
    - [`number`](#number)
    - [`object`](#object-1)
    - [`reference`](#reference)
    - [`string`](#string)
  - [`Examples`](#examples-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## `Install`
```sh
npm install uvo
//or
yarn add uvo
```
## `Classic API`
### `Usage`
```js
import * as v from 'uvo';

v.number()(10);
// => 10

v.number()('abc');
// => null

const simpleObj = (
  v.object2([
    ['id', v.number(), v.gte(0)],
    ['name', v.string(), v.minLen(10)],
    ['role', v.string(), v.regex(/^[A-Z]{5,20}$/)]
  ])
);

simpleObj({
  id: 3, // right
  name: 'YourAwesomeUserName', // right
  role: 'invalidRole' // wrong
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }
```
### `Validators`
Checks input with some conditions. Returns input value on success, otherwise 'null' will be returned.
#### `array`

```js
array<T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, error?: Error): Validator<Array<any>, Array<T>>
```
Checks value to be an array.
<details>
<summary>details</summary>


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
</details>

---

#### `bool <checkable>`

```js
bool<T>(error?: Error): Validator<T, boolean>
```
Checks value to be a boolean compatible.
<details>
<summary>details</summary>


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
</details>

---

#### `date <checkable>`

```js
date<T>(error?: Error): Validator<T, number>
```
Checks value to be a date compatible. Result in ms.
<details>
<summary>details</summary>


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
</details>

---

#### `defined`

```js
defined<T>(error?: Error): Validator<T>
```
Checks value to be defined.
<details>
<summary>details</summary>


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
</details>

---

#### `empty <invertible>`

```js
empty<T>(error?: Error): Validator<T>
```
Checks value to be empty.
<details>
<summary>details</summary>


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
</details>

---

#### `equal <invertible>`

```js
equal<T>(match: T | (() => T), error?: Error): Validator<T>
```
Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.
<details>
<summary>details</summary>


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
</details>

---

#### `even <invertible>`

```js
even(error?: Error): Validator<number>
```
Checks number to be an even one.
<details>
<summary>details</summary>


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
</details>

---

#### `fields`

```js
fields<T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T>
```
Checks for fields in the input object.
<details>
<summary>details</summary>


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
</details>

---

#### `gte <invertible>`

```js
gte<T>(bound: T | (() => T), error?: Error): Validator<T>
```
Checks value to be greater or equal to 'bound' param. Requires the same type.
<details>
<summary>details</summary>


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
</details>

---

#### `integer <invertible>`

```js
integer(error?: Error): Validator<number>
```
Checks number to be an integer.
<details>
<summary>details</summary>


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
</details>

---

#### `is`

```js
is<T>(comparator: ((value: T) => boolean), error?: Error): Validator<T>
```
Checks value with custom comparator.
<details>
<summary>details</summary>


```js
import * as v from 'uvo';

v.is((value: number) => value === 10)(10);
// => 10

v.is((value) => value === 10)('10');
// => null
```
</details>

---

#### `length <invertible>`

```js
length<T extends Lengthy>(len: number | (() => number), error?: Error): Validator<T>
```
Compares length with 'len' param. Requires to be an object like or string.
<details>
<summary>details</summary>


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
</details>

---

#### `lte <invertible>`

```js
lte<T>(bound: T | (() => T), error?: Error): Validator<T>
```
Checks value to be lower or equal to 'bound' param. Requires the same type.
<details>
<summary>details</summary>


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
</details>

---

#### `maxLen <invertible>`

```js
maxLen<T extends Lengthy>(len: number | (() => number), error?: Error): Validator<T>
```
Checks length to be equal to 'len' param. Requires to be an object like or string.
<details>
<summary>details</summary>


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
</details>

---

#### `minLen <invertible>`

```js
minLen<T extends Lengthy>(len: number | (() => number), error?: Error): Validator<T>
```
Checks length to be equal to 'len' param. Requires to be an object like or string.
<details>
<summary>details</summary>


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
</details>

---

#### `multiple <invertible>`

```js
multiple(multiplier: number | (() => number), error?: Error): Validator<number>
```
Checks number to be an integer.
<details>
<summary>details</summary>


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
</details>

---

#### `number <checkable>`

```js
number<T>(error?: Error): Validator<T, number>
```
Checks value to be a number compatible.
<details>
<summary>details</summary>


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
</details>

---

#### `object`

```js
object<T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R>
```
Checks value to be an object.
<details>
<summary>details</summary>


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
</details>

---

#### `object2`

```js
object2<T extends ObjectLike, R = T>(spec?: Array<[string | RegEx, ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R>
```
Checks value to be an object. Provides strict ordering. Each key can be a Regex.
<details>
<summary>details</summary>


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
</details>

---

#### `oneOf <invertible>`

```js
oneOf<T>(candidates: Array<T> | string | (() => Array<T> | string), error?: Error): Validator<T>
```
Checks value to be one of expected. Shallow comparison.
<details>
<summary>details</summary>


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
</details>

---

#### `regex <invertible>`

```js
regex<T>(match: RegExp | (() => RegExp), error?: Error): Validator<T>
```
Checks value to match a pattern.
<details>
<summary>details</summary>


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
</details>

---

#### `string <checkable>`

```js
string<T>(error?: Error): Validator<T, string>
```
Checks value to be a string compatible.
<details>
<summary>details</summary>


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
</details>

---

#### `unique`

```js
array<T>(field?: string | number | ((value: T) => any), error?: Error): Validator<Array<T>>
```
Checks array's elements to be unique.
<details>
<summary>details</summary>


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
</details>

---

### `Processors`
Processes input value. No input types check. Recommended to use validators before.
#### `clamp`

```js
clamp<T>(min: T, max: T): Validator<T, T>
```
Clamps value to required boundaries.
<details>
<summary>details</summary>


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
</details>

---

#### `erase`

```js
erase<T>(): Validator<T, null>
```
Erase input.
<details>
<summary>details</summary>


```js
import * as v from 'uvo';

v.erase()(2);
// => null
```
</details>

---

#### `keysMap`

```js
keysMap<T extends ObjectLike>(mapper: (key: string) => string): Validator<T, T>
```
Maps object keys with custom mapper.
<details>
<summary>details</summary>


```js
import * as v from 'uvo';

v.keysMap((key: string) => `_${key}`)({ f1: 'abc', f2: 10 });
// => { _f1: 'abc', _f2: 10 }

v.keysMap((key: string) => key.toUpperCase())({ f1: 'abc', f2: 10 });
// => { F1: 'abc', F2: 10 }

v.keysMap((key: string) => key === 'f1' ? 'f2' : key)({ f1: 'abc' }); // moves/renames field
// => { f2: 'abc' }
```
</details>

---

#### `lowercase`

```js
lowercase(): Validator<string, string>
```
Lowercase input string.
<details>
<summary>details</summary>


```js
import * as v from 'uvo';

v.lowercase()('ABC');
// => 'abc'
```
</details>

---

#### `random`

```js
random(min: number, max: number, precision: number): Validator<any, number>
```
Returns random value according to params.
<details>
<summary>details</summary>


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
</details>

---

#### `round`

```js
round(method?: 'floor' | 'ceil'): Validator<number, number>
```
Round input number with specific method.
<details>
<summary>details</summary>


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
</details>

---

#### `strip`

```js
strip<T extends ObjectLike, K>(field: string | RegExp, condition: boolean | ((value: K) => boolean) = true): Validator<T, T>
```
Removes field from object conditionally.
<details>
<summary>details</summary>


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
</details>

---

#### `trim`

```js
trim(method?: 'left' | 'right'): Validator<string, string>
```
Trim input string with specific method.
<details>
<summary>details</summary>


```js
import * as v from 'uvo';

v.trim()(' abc ');
// => 'abc'

v.trim('left')(' abc ');
// => 'abc '

v.trim('right')(' abc ');
// => ' abc'
```
</details>

---

#### `uppercase`

```js
uppercase(): Validator<string, string>
```
Uppercase input string.
<details>
<summary>details</summary>


```js
import * as v from 'uvo';

v.uppercase()('abc');
// => 'ABC'
```
</details>

---

#### `valueMap`

```js
valueMap<T, R>(...mappers: Array<[Primitive | ((value: T) => boolean) | RegExp, Primitive | ((value: T) => R)]>): Validator<T, R>
```
Maps value with custom mappers.
<details>
<summary>details</summary>


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
</details>

---

### `Groupers`
Groups validators in a specific way.
#### `consecutive`

```js
consecutive<T>(...validators: Array<Validator<any, T>>): Validator<any, T>
```
Groups validators sequentially. Passes value through a sequence of validators until an error occurs. Uses by default in 'object' and 'object2' validator's scheme for fields.
<details>
<summary>details</summary>


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
</details>

---

#### `or`

```js
or<T>(...validators: Array<Validator<any, any>>): Validator<any, any>
```
Groups validators sequentially. Searches for first successful validator's result.
<details>
<summary>details</summary>


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
</details>

---

#### `parallel`

```js
parallel<T>(...validators: Array<Validator<T>>): Validator<T>
```
Groups validators in parallel. The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere). Beware of using processors inside.
<details>
<summary>details</summary>


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
</details>

---

#### `transform`

```js
transform<T, R>(...processors: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Groups processors sequentially. Passes value through a sequence of processors. Takes only processors (doesn't check errors).
<details>
<summary>details</summary>


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
</details>

---

### `Containers`
Embraces validators with additional data processing.
#### `withErrors`

```js
withErrors<T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: Error, meta?: MetaData) => Error)): Validator<T, Result<R>>
```
Provides error handling mechanism.
<details>
<summary>details</summary>


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
</details>

---

#### `withFallback`

```js
withFallback<T, R>(fallback: R | ((initialValue: T, meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Provides fallback value on error.
<details>
<summary>details</summary>


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
</details>

---

#### `withMeta`

```js
withMeta<T, R>(validator: Validator<T, R>, onLogs?: (logs: Array<[string, any, Array<any>]>): Validator<T, R>
```
Provides meta structure. Can catch scheme logs.
<details>
<summary>details</summary>


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
</details>

---

#### `withOnError`

```js
withOnError<T, R>(errorProcessor: ErrorCallback, ...validators: Array<Validator<any, T>>): Validator<T, R>
```
Provides custom error handler.
<details>
<summary>details</summary>


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
</details>

---

#### `withPromise`

```js
withPromise<T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Array<Error>>>
```
Convert result to promise. Use it for async validation.
<details>
<summary>details</summary>


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
</details>

---

### `Spreaders`
Spreads data through a validators scheme. Almost all spreaders requires meta schema to be provided with 'withMeta'.
#### `dynamic`

```js
dynamic<T>(preValidator: () => Validator<T> | Array<Validator<T>>): Validator<T>
```
Inserts new validators into scheme dynamically.
<details>
<summary>details</summary>


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
</details>

---

#### `getDep`

```js
getDep<T>(field: string, preValidator?: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T>
```
Takes value from spreaded structure. Might be used for dynamic validators creation. If 'preValidator' not provided, just replaces current value. Works only with provided meta object.
<details>
<summary>details</summary>


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
</details>

---

#### `setDep`

```js
setDep<T>(field: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>
```
Puts value into spreaded structure. If 'extValue' is provided, puts it instead of current value. i.e. reference api.
<details>
<summary>details</summary>


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
</details>

---

#### `setVDep`

```js
setVDep<T>(field: string, ...validators: Array<Validator<T>>): Validator<T>
```
Puts validators into spreaded structure. Might be used for recursive schemes.
<details>
<summary>details</summary>


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
</details>

---

#### `useDefault`

```js
useDefault<T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Puts default value into spreaded structure. If input value is empty, puts default value instead, otherwise validates input values with provided validators. If you need fallback value on error use 'withFallback' container instead.
<details>
<summary>details</summary>


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
</details>

---

### `Logs`
`withMeta` container provides logs capturing via `onLogs` parameter.

```js
import * as v from 'uvo';

v.withMeta(
  v.object2([
    ['id', v.empty.not(), v.number(), v.gte.not(0)],
    ['name', v.string(), v.maxLen(25)]
  ]), console.log
)({
  id: 10,
  name: 'MasterSais'
})
// => { id: 10, name: 'MasterSais' }
//
// [
//   ['object', { id: 10, name: 'MasterSais' }, []],
//   ['not:empty', 10, [null, undefined, '']],
//   ['number', 10, []],
//   ['not:gte', 10, [0]],
//   ['string', 'MasterSais', []],
//   ['maxLen', 'MasterSais', [25]]
// ]
```
### `Custom validators`
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
### `Examples`
All examples use advanced object schema 'object2' as recommended solution.

<details>
  <summary>Schema with custom user errors</summary>
  
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

</details>

<br />

<details>
  <summary>Schema with common error processor</summary>

  ```js
  // Each error will be represented as `{ path, validator, error }`
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

</details>

<br />

<details>
  <summary>Fields validation</summary>

  ```js
  // Before validation checks required fields existence
  v.consecutive(
    v.fields(['&', ['^', 'id', 'guid'], 'login']),
    v.object2([
      ['id', v.number(), v.gte(0)],
      ['guid', v.string(), v.length(36)],
      ['login', v.string(), v.minLen(10)]
    ])
  )
  ```

</details>

<br />

<details>
  <summary>Conditional validation</summary>

  ```js
  // Id can be an integer or a GUID
  v.object2([
    ['id', v.or(
      v.consecutive(v.number(), v.integer(), v.gte(0)),
      v.consecutive(v.string(), v.length(36)) // !notice: prefer to use 'regex' for GUID validation.
    )],
    ['name', v.string(), v.minLen(10)]
  ])
  ```
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

</details>

<br />

<details>
  <summary>Injections</summary>

  ```js
  // Array with custom processor injection
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

</details>

<br />

<details>
  <summary>Fields strip</summary>

  ```js
  // Removes unnecessary fields
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

</details>

<br />

<details>
  <summary>Keys transformations</summary>

  ```js
  // Camelize object fields
  v.consecutive( // groups validators.
    v.object2([
      ['--id--', v.number(), v.integer(), v.gte(0)],
      ['--name--', v.string(), v.minLen(10)]
    ]),
    v.keysMap(_.camelCase) // e.g. using lodash
  )
  ```

</details>

<br />

<details>
  <summary>Custom value mapping</summary>

  ```js
  // Maps 'yes' and 'no' on boolean
  v.object2([
    ['id', v.number(), v.integer(), v.gte(0)],
    ['name', v.string(), v.minLen(10)],
    ['disabled', 
      v.valueMap(['yes', true], ['no', false]), // converts specific value to type compatible value.
      v.bool() // just check and cast another boolean compatible values.
    ]
  ])
  ```

</details>

<br />

<details>
  <summary>Multiple validations</summary>

  ```js
  // Validate field two or more times
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

</details>
### `Types`
The main types used in the library.
#### `ErrorCallback`


Calls on validation error.
<details>
<summary>details</summary>


```js
type ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) => void;
```
</details>

---

#### `Error`


Any type's error.  Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
<details>
<summary>details</summary>


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
</details>

---

#### `FieldsSpec`


Specification for 'fields' validator.
<details>
<summary>details</summary>


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
</details>

---

#### `MetaData`


Internal data for errors and dependencies.
<details>
<summary>details</summary>


```js
type MetaData = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  _deps: Record<string, any>;
  _logs: Array<[string, any, Array<any>]>;
};
```
</details>

---

#### `ObjectSpec`


Specification for 'object' and 'object2' validators.
<details>
<summary>details</summary>


```js
type ObjectSpec = Record<string, Array<Validator<any, any>> | Validator<any, any>>;
```
</details>

---

#### `Relevance`


Error's relevancy status.
<details>
<summary>details</summary>


```js
type Relevance = {
  value: boolean;
};
```
</details>

---

#### `Result`


'WithError' container's result. Will be null if no errors.
<details>
<summary>details</summary>


```js
type Result<T> = {
  result: T;
  errors?: Array<any>;
};
```
</details>

---

#### `Validator`


Validates value.
<details>
<summary>details</summary>


```js
type Validator<T> = (value: T, onError?: ErrorCallback, meta?: MetaData) => T;
```
</details>

---

## `Templating API (beta)`
Templating api provides string based validators creation. Much more compact and flexible against classic API.
All errors and injections are placed in separated structures.
### `Usage`
```js
import { template, tml } from 'uvo/template';

// base version
template(`...`)(
  {/* injections for template (object or array) */},
  {/* errors for template (object or array) */}
);

// short version
tml`...`(
  {/* injections for template (object or array) */},
  {/* errors for template (object or array) */}
);
```
### `Keys`
#### `array`


Checks value to be an array. `a` - short version.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`
  @array(
    @string : @length(<8)
  )
`)();

tml`
  @a(
    @s @l(<8)
  )
`();
```
</details>

---

#### `bool`


Checks value to be a boolean compatible. `b` - short version.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`@bool`)();

tml`@b`();
```
</details>

---

#### `compare`


Checks value with provided comparator. `c` - short version.
Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` `->` (one of) `!->`
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`@compare(>=0)`)(); // number

template(`@compare(>=0,<=100)`)(); // few comparisons

template(`@compare(!=null)`)(); // null literal

tml`@c(='2')`(); // string literal

tml`@c(>#refName)`(); // reference

tml`@c(!=$param)`({ param: 10 }); // injection.

tml`@c(%2)`(); // multiple to.

tml`@c(->$0)`([[1, 2, 3]]); // one of.
```
</details>

---

#### `containers`


Provides specific container for scheme.
`~error` - provides `withErrors` container. `~e` - short version.
`~meta` - provides `withMeta` container. `~m` - short version.
`~promise` - provides `withPromise` container. `~p` - short version.
The last container will be an outer one. `promise` must go later than others containers.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`
  @object(
    a : @date : #a,
    b : @date : @compare(>=#a) : #b,
    c : @date : @compare(>=#b)
  ) ~error ~meta
`)();

tml`
  @o(
    a @d #a,
    b @d @c(>=#a) #b,
    c @d @c(>=#b)
  ) ~e ~m
`();
```
</details>

---

#### `date`


Checks value to be a date compatible. `d` - short version.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`@date`)();

tml`@d`();
```
</details>

---

#### `errors`


Errors for scheme. Use `!` after validator.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number!err1 : @compare(>0)!err2,
    name : @string!err3 : @length(>=10)!err4
  ) ~error
`)(null, { err1: 'ERR1', err2: () => 'ERR2', err3: 'ERR3', err4: () => 'ERR4' });

tml`
  @o(
    id @n!0 @c(>0)!1,
    name @s!2 @l(>=10)!3
  ) ~e
`(null, ['ERR1', () => 'ERR2', 'ERR3', () => 'ERR4']);

// Common error processor with logs
template(`
  @object(
    id : @number!0 : @compare(>0)!1,
    name : @string!2 : @length(>=10)!3
  ) ~error($0) ~meta($1)
`)(
  [
    (error, { validator }) => ({ error, validator }),
    logs => console.log(logs)
  ], 
  ['ERR1', () => 'ERR2', 'ERR3', () => 'ERR4']
);
```
</details>

---

#### `injection`


External injections for scheme.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number : @compare(>$minId),
    name : @string : @length(>=$minNameLength)
  )
`)({ minId: 0, minNameLength: () => 10 });

tml`
  @o(
    id @n @c(>$0),
    name @s @l(>=$1)
  )
`([0, () => 10]);

// Dynamic validators. `<( ... )>` - consecutive grouper.
template(`
  @object(
    id : @number : @compare(>0),
    name : $cond ? <( @string : @length(>=10) )>
  )
`)({ 
  cond: () => true // Condition for dynamic validation.
});

// Dynamic validators on reference
template(`
  @object(
    id : @number : @compare(>0) : #id,
    name : #id ? <( @string : @length(>=10) )>
  )
`)(); // Will validate name if 'id' ref is defined.

// Dynamic validators with reference in injection
template(`
  @object(
    id : @number : @compare(>0) : #id,
    name : $cond(#id) ? <( @string : @length(>=10) )>
  )
`)({ 
  cond: (id: number) => !!id
});
```
</details>

---

#### `length`


Checks value's length with provided comparator. `l` - short version.
Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`@length(>=0)`)();

template(`@length(>=10,<=100)`)();

template(`@length(=2)`)();

tml`@l(>#refName)`();

tml`@l(!=$param)`({ param: 10 });

tml`@l(%2)`();

tml`@l(<=$0)`([10]);
```
</details>

---

#### `number`


Checks value to be a number. `n` - short version.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`@number`)();

tml`@n`();
```
</details>

---

#### `object`


Checks value to be an object. `o` - short version.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number : @compare(>0),
    name : @string : @length(>=10)
  )
`)();

tml`
  @o(
    id @n @c(>0),
    name @s @l(>=10)
  )
`();
```
</details>

---

#### `reference`


Provides references across the scheme.
`#...` in validation sequence settles current value as specific reference. 
`#...` in parameters retrieves value from specific reference. 
Meta required.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`
  @object(
    a : @date : @compare(>$now) : #a,
    b : @date : @compare(>=#a) : #b,
    c : @date : @compare(>=#b)
  ) ~meta
`)({ now: Date.now() });

tml`
  @o(
    a @d @c(>$0) #a,
    b @d @c(>=#a) #b,
    c @d @c(>=#b)
  ) ~m
`([Date.now()]);

// Additional reference value processing via injected function.
tml`
  @o(
    a @d @c(>$0) #a,
    b @d @c(>=$1(#a)) #b,
    c @d @c(>=#b)
  ) ~m
`([
  Date.now(),
  a => a + 1000 // 'b' must be greater or equal than 'a' + 1000.
]);

// Recursive
template(`
  #node(
    @object(
      id : @number : @compare(>=0),
      node : ##node
    )
  ) ~meta
`)()
```
</details>

---

#### `string`


Checks value to be a string. `s` - short version.
<details>
<summary>details</summary>


```js
import { template, tml } from 'uvo/template';

template(`@string`)();

tml`@s`();
```
</details>

---

### `Examples`
<details>
  <summary>Base example</summary>

```js
import { template, tml } from 'uvo/template';

const validator = template(`
  @object(
    id : @number : @compare(>$min) : @compare(<=$max),
    name : @string : @length(>=10),
    roles : @array(
      @string : @length(<8)
    )
  )
`)({ min: 0, max: () => 100 });

validator({ id: 1, name: 'MasterSais', roles: ['Admin'] });
// => { id: 1, name: 'MasterSais', roles: ['Admin'] }

validator({ id: -1, name: 'Master' });
// => { id: null, name: null, roles: null }

validator({ id: -1, name: 'Master', roles: ['NotAdmin'] });
// => { id: null, name: null, roles: [null] }

// the shortest version
const shortestOne = tml`
  @o(
    id @n @c(>$0) @c(<=$1),
    name @s @l(>=10),
    roles @a(
      @s @l(<8)
    )
  )
`([0, () => 100]);
```

</details>
