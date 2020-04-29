# `Base API`
## `Validators`
Checks input with some conditions. Returns input value on success, otherwise 'null' will be returned.
### `array`

```js
array(itemSpec?: Array<Validator<any>> | Validator<any>, error?: Error): Validator<Array<any>, Array<any>>
```
Checks value to be an array.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.

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

### `async`

```js
async<T>(name?: string, error?: Error): Validator<Promise<T>, Promise<T>>
```
Settles value to async storage. Can be awaited somewhere later.    Type: validator. Returns input value on success.

```js
import * as v from 'uvo';

v.withMeta(
  v.withPromise(
    v.object2([
      ['user', v.async('user'), ( // Settle 'user' promise.
        v.object({
          id: [v.number(), v.setRef('userId')],
          name: [v.string()]
        })
      )],
      ['roles',
        v.wait('user'), // Wait for 'user' promise.
        v.getRef('userId'),
        // (userId: number) => e.g. request roles
      ],
    ])
  )
);
```

### `bool`

```js
bool<T>(error?: Error): Validator<T, boolean>
```
Checks value to be a boolean compatible. Converts on success. Use `bool` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.

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

### `date`

```js
date<T>(error?: Error): Validator<T, number>
```
Checks value to be a date compatible. Result in ms. Converts on success. Use `date` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.

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

### `fields`

```js
fields<T extends ObjectLike>(spec: FieldsSpec, error?: Error): Validator<T>
```
Checks for fields in the input object.    Type: validator. Returns input value on success.

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

### `is`

```js
is<T>(comparator: ((value: T) => boolean), error?: Error): Validator<T>
```
Checks value with custom comparator.    Type: validator. Returns input value on success.

```js
import * as v from 'uvo';

v.is((value: number) => value === 10)(10);
// => 10

v.is((value) => value === 10)('10');
// => null
```

### `length`

```js
length<T extends Lengthy>(len: number | (() => number), error?: Error): Validator<T>
```
Compares length with 'len' param. Requires to be an object like or string.    Type: validator. Returns input value on success.

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

### `multiple`

```js
multiple(multiplier: number | (() => number), error?: Error): Validator<number>
```
Checks number to be an integer.    Type: validator. Returns input value on success.

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

### `number`

```js
number<T>(error?: Error): Validator<T, number>
```
Checks value to be a number compatible. Converts on success. Use `number` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.

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

### `object`

```js
object<T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R>
```
Checks value to be an object.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.

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

### `object2`

```js
object2<T extends ObjectLike, R = T>(spec?: Array<[string | RegEx | Array<string> (() => string | RegExp | Array<string>), ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R>
```
Checks value to be an object. Provides strict ordering.  Each key can be a Regex.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.

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

v.object2([
  ['id', v.number(), v.gte(0)],
  [['name', 'surname', 'thirdname'], v.string(), v.minLen(10)] // Array of fields
]);

v.object2([
  ['id', v.number(), v.gte(0)],
  [/.*(name)/, v.string(), v.minLen(10)] // RegEx for fields
]);
```

### `string`

```js
string<T>(error?: Error): Validator<T, string>
```
Checks value to be a string compatible. Converts on success. Use `string` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.

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

## `Processors`
Processes input value. No input types check. Recommended to use validators before.
### `keysMap`

```js
keysMap<T extends ObjectLike>(mapper: (key: string) => string): Validator<T, T>
```
Maps object keys with custom mapper.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

```js
import * as v from 'uvo';

v.keysMap((key: string) => `_${key}`)({ f1: 'abc', f2: 10 });
// => { _f1: 'abc', _f2: 10 }

v.keysMap((key: string) => key.toUpperCase())({ f1: 'abc', f2: 10 });
// => { F1: 'abc', F2: 10 }

v.keysMap((key: string) => key === 'f1' ? 'f2' : key)({ f1: 'abc' }); // moves/renames field
// => { f2: 'abc' }
```

### `strip`

```js
strip<T extends ObjectLike, K>(field: string | RegExp, condition: boolean | ((value: K) => boolean) = true): Validator<T, T>
```
Removes field from object conditionally.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

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

### `valueMap`

```js
valueMap<T, R>(...mappers: Array<[Primitive | ((value: T) => boolean) | RegExp, Primitive | ((value: T) => R)]>): Validator<T, R>
```
Maps value with custom mappers.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

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

## `Groupers`
Groups validators in a specific way.
### `consecutive`

```js
consecutive<T>(...validators: Array<Validator<any, T>>): Validator<any, T>
```
Groups validators sequentially.  Passes value through a sequence of validators until an error occurs.  Uses by default in 'object' and 'object2' validator's scheme for fields.    Type: grouper. Groups validators into one.

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

### `or`

```js
or<T>(...validators: Array<Validator<any, any>>): Validator<any, any>
```
Groups validators sequentially.  Searches for first successful validator's result.    Type: grouper. Groups validators into one.

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

### `parallel`

```js
parallel<T>(...validators: Array<Validator<T>>): Validator<T>
```
Groups validators in parallel.  The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).  Beware of using processors inside.    Type: grouper. Groups validators into one.

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

### `transform`

```js
transform<T, R>(...processors: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Groups processors sequentially.  Passes value through a sequence of processors.  Takes only processors (doesn't check errors).    Type: grouper. Groups validators into one.

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

## `Containers`
Embraces validators with additional data processing.
### `withErrors`

```js
withErrors<T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: Error, meta?: MetaData) => Error)): Validator<T, Result<R>>
```
Provides error handling mechanism.    Type: container. Embraces validators. Provides additional input processing.

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

### `withFallback`

```js
withFallback<T, R>(fallback: R | ((initialValue: T, meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Provides fallback value on error.    Type: container. Embraces validators. Provides additional input processing.

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

### `withMeta`

```js
withMeta<T, R>(validator: Validator<T, R>, onLogs?: (logs: Array<[string, any, Array<any>]>, meta: MetaData): Validator<T, R>
```
Provides meta structure. Can catch scheme logs.    Type: container. Embraces validators. Provides additional input processing.

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

### `withOnError`

```js
withOnError<T, R>(errorProcessor: ErrorCallback, ...validators: Array<Validator<any, T>>): Validator<T, R>
```
Provides custom error handler.    Type: container. Embraces validators. Provides additional input processing.

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

### `withPromise`

```js
withPromise<T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Result<R>>>
```
Convert result to promise. Use it for async validation.    Type: container. Embraces validators. Provides additional input processing.

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
  // => { result: null, errors: ['ERR'] }
}
```

## `Spreaders`
Spreads data through a validators scheme. Almost all spreaders requires meta schema to be provided with 'withMeta'.
### `dynamic`

```js
dynamic<T>(preValidator: (value: T) => Validator<T> | Array<Validator<T>>): Validator<T>
```
Inserts new validators into scheme dynamically.    Type: spreader. Spreads data through a validators scheme.

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

### `getRef`

```js
getRef<T>(field: string, preValidator?: (ref: T) => Validator<T> | Array<Validator<T>>): Validator<T>
```
Takes value from spreaded structure.  Might be used for dynamic validators creation.  If 'preValidator' not provided, just replaces current value.  Works only with provided meta object.    Type: spreader. Spreads data through a validators scheme.

```js
import * as v from 'uvo';

const simpleOne = (
  v.withMeta(
    v.object({
      pass: [v.string(), v.minLen(10), v.setRef('pass')],
      pass2: [v.getRef('pass', (pass: string) => v.equal(pass))] // Compares password and password confirmation
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

### `setRef`

```js
setRef<T>(field?: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>
```
Puts value into spreaded structure.  If 'extValue' is provided, puts it instead of current value. i.e. reference api.    Type: spreader. Spreads data through a validators scheme.

```js
import * as v from 'uvo';

v.withMeta( // meta schema required for dependencies.
  v.object({
    id: [v.number(), v.gte(0), v.setRef('id')] // if 'id' is valid, sets 'id' dependency into schema.
  })
);

v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setRef()] // Sets into 'id' implicitly. Concats field's path.
  })
);

// without explicit field name
v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setRef()]
  })
);

v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setRef('isIdValid', true)] // custom data for dependency.
  })
);

v.withMeta(
  v.consecutive(
    v.setRef('beforeObjectValidation', true), // non conditional dependency.
    v.object({
      id: [v.number(), v.gte(0)]
    })
  )
);
```

### `setVRef`

```js
setVRef<T>(field: string, ...validators: Array<Validator<T>>): Validator<T>
```
Puts validators into spreaded structure.  Might be used for recursive schemes.    Type: spreader. Spreads data through a validators scheme.

```js
import * as v from 'uvo';

const recursiveOne = (
  v.withMeta( // meta schema is required.
    v.setVRef('node', // sets validators into meta schema.
      v.object({
        id: [v.number(), v.gte(0)],
        node: v.getRef('node', validators => validators)
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

### `useDefault`

```js
useDefault<T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>
```
Puts default value into spreaded structure.  If input value is empty, puts default value instead, otherwise validates input values with provided validators.  If you need fallback value on error use 'withFallback' container instead.    Type: spreader. Spreads data through a validators scheme.

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

### `wait`

```js
wait<T>(name: string): Validator<T, Promise<T>>
```
Waits for specified promise.    Type: spreader. Spreads data through a validators scheme.

```js
import * as v from 'uvo';

v.withMeta(
  v.withPromise(
    v.object2([
      ['user', v.async('user'), ( // Settle 'user' promise.
        v.object({
          id: [v.number(), v.setRef('userId')],
          name: [v.string()]
        })
      )],
      ['roles',
        v.wait('user'), // Wait for 'user' promise.
        v.getRef('userId'),
        // (userId: number) => e.g. request roles
      ],
    ])
  )
);
```

## `Logs`
`withMeta` container provides logs capturing via `onLogs` parameter.

```js
import * as v from 'uvo';

v.withMeta(
  v.object2([
    ['id', v.empty.not(), v.number(), v.gte.not(0)],
    ['name', v.string(), v.maxLen(25)]
  ]), (logs, meta) => console.log(logs)
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

Schema with custom user errors
  
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

Schema with common error processor

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

Fields validation

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

Conditional validation

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
    ['id', v.number(), v.gte(0), v.setRef('isIdValid', true)],
    ['name', getRef(
      'isIdValid',
      (isIdValid: boolean) => isIdValid && [v.string(), v.minLen(10)]
    )]
  ])
)
```

Injections

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

Fields strip

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

Keys transformations

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

Custom value mapping

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

Multiple validations

```js
// Validate field two or more times
v.withMeta( // for deps api.
  v.object2([
    [/createdAt|updatedAt|deletedAt/, v.date()],
    ['createdAt', v.setRef('createdAt')],
    ['updatedAt', 
      v.getRef('createdAt', createdAt => createdAt && v.gte(createdAt)), // updatedAt >= createdAt.
      v.setRef('updatedAt')
    ],
    ['deletedAt', 
      v.getRef('updatedAt', updatedAt => updatedAt && v.gte(updatedAt)), // deletedAt >= updatedAt.
    ],
    [/createdAt|updatedAt|deletedAt/, date => date && new Date(date).toLocaleDateString()], // finally format all dates.
  ])
)
```
## `Types`
The main types used in the library.
### `ErrorCallback`


Calls on validation error.

```js
type ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) => void;
```

### `Error`


Any type's error.   Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.

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

### `FieldsSpec`


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

### `MetaData`


Internal data for errors and dependencies.

```js
type MetaData = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  _deps: Record<string, any>;
  _logs: Array<[string, any, Array<any>]>;
};
```

### `ObjectSpec`


Specification for 'object' and 'object2' validators.

```js
type ObjectSpec = Record<string, Array<Validator<any, any>> | Validator<any, any>>;
```

### `Relevance`


Error's relevancy status.

```js
type Relevance = {
  value: boolean;
};
```

### `Result`


'WithError' container's result. Will be null if no errors.

```js
type Result<T> = {
  result: T;
  errors?: Array<any>;
};
```

### `Validator`


Validates value.

```js
type Validator<T> = (value: T, onError?: ErrorCallback, meta?: MetaData) => T;
```

# `Templating API`
Templating api provides string based validators creation. Much more compact and flexible against base API.
All errors and injections are placed in separated structures.
## `Keys`
### `array`


Checks value to be an array. `a` - short version.

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

### `bool`


Checks value to be a boolean compatible. `b` - short version.

```js
import { template, tml } from 'uvo/template';

template(`@bool`)();

tml`@b`();
```

### `compare`


Checks value with provided comparator. `c` - short version.    Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` `->` (one of) `!->` `` regex match `!`

```js
import { template, tml } from 'uvo/template';

template(`@compare(>=0)`)(); // number

template(`@compare(>=0,<=100)`)(); // few comparisons

template(`@compare(!=null)`)(); // null literal

tml`@c(='2')`(); // string literal

tml`@c(>#refName)`(); // reference

tml`@c(!=$param)`({ param: 10 }); // injection.

tml`@c(*$0)`([/[0-9]/]); // Regex.

tml`@c(%2)`(); // multiple to.

tml`@c(->$0)`([[1, 2, 3]]); // one of.
```

### `containers`


Provides specific container for scheme.    `~error` - provides `withErrors` container. `~e` - short version.    `~meta` - provides `withMeta` container. `~m` - short version.    `~promise` - provides `withPromise` container. `~p` - short version.    The last container will be an outer one. `promise` must go later than others containers.

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

### `date`


Checks value to be a date compatible. `d` - short version.

```js
import { template, tml } from 'uvo/template';

template(`@date`)();

tml`@d`();
```

### `default`


Provides default value into sequence.

```js
import { template } from 'uvo/template';

template(`@default(10, @number)`)();

template(`@default($0, @number)`)([() => 10]);
```

### `errors`


Errors for scheme. Use `!` after validator.

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

### `fallback`


Provides fallback into sequence. `f` - short version.

```js
import { template, tml } from 'uvo/template';

template(`@fallback(10, @number)`)();

template(`@fallback($0, @number)`)([() => 10]);

tml`@f(10, @n)`();
```

### `groupers`


Provides grouping for validators.    <( ... )> - consecutive.    <[ ... ]> - or.    <{ ... }> - parallel.

```js
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : <[ 
      <( @number : @compare(>=0) )>
      <( @string : @length(=36) )> 
    ]>,
    name : @string : <{ @length(>=10) : #name }>
  )
`)();

tml`
  @o(
    id <[ 
      <( @n @c(>=0) )>
      <( @s @l(=36) )> 
    ]>,
    name @s <{ @l(>=10) #name }>
  )
`();
```

### `injection`


External injections for scheme.

```js
import { gte } from 'uvo';
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

// Validators injection
template(`
  @object(
    id : @number : $0
  )
`)([
  gte(0)
])()

// Processor injection
template(`
  @array(
    @number : @compare(>=0)
  ) : $0
`)([
  (data: Array<number>) => data.filter(value => !!value)
]);
```

### `length`


Checks value's length with provided comparator. `l` - short version.    Comparators: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)

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

### `number`


Checks value to be a number. `n` - short version.

```js
import { template, tml } from 'uvo/template';

template(`@number`)();

tml`@n`();
```

### `object`


Checks value to be an object. `o` - short version.

```js
import { template, tml } from 'uvo/template';

template(`
  @object(
    id : @number : @compare(>0),
    name : @string : @length(>=10)
  )
`)();

template(`
  @object(
    $0 : @number : @compare(>0),
    $1 : @string : @length(>=10),
    $2 : @bool
  )
`)([
  'id',
  /.*(name)/,
  ['isValid', 'isActive']
]);

tml`
  @o(
    id @n @c(>0),
    name @s @l(>=10)
  )
`();
```

### `reference`


Provides references across the scheme.    `#...` in validation sequence settles current value as specific reference.     `#...` in parameters retrieves value from specific reference.     Meta required.

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

### `string`


Checks value to be a string. `s` - short version.

```js
import { template, tml } from 'uvo/template';

template(`@string`)();

tml`@s`();
```

### `unique`


Checks list to be unique..

```js
import { template, tml } from 'uvo/template';

template(`@array : @unique`)();

template(`@array : @unique('id')`)(); // by 'id'

template(`@array : @unique($0)`)([item => item.id]); // by 'id' 

tml`@a @unique`();
```

# `Extended API`
## `Validators`
### `alpha`

```js
alpha(error?: Error): Validator<string>
```
Checks if the string contains only letters (a-zA-Z).    Type: validator. Returns input value on success.

### `alphanum`

```js
alphanum(error?: Error): Validator<string>
```
Checks if the string contains only letters (a-zA-Z) and numbers.    Type: validator. Returns input value on success.

### `bin`

```js
bin(error?: Error): Validator<string>
```
Checks if the string is a binary number.    Type: validator. Returns input value on success.

### `bool`

```js
bool(error?: Error): Validator<boolean>
```
Checks for boolean type.    Type: validator. Returns input value on success.

### `contains`

```js
contains(seed: any, error?: Error): Validator<string | Array<any>>
```
Checks if the string or array contains the seed.    Type: validator. Returns input value on success.

### `date`

```js
date<T>(error?: Error): Validator<T>
```
Checks for right date.    Type: validator. Returns input value on success.

### `emailFast`

```js
emailFast(error?: Error): Validator<string>
```
Fast email validation.    Type: validator. Returns input value on success.

### `email`

```js
email(error?: Error): Validator<string>
```
Email validation.    Type: validator. Returns input value on success.

### `even`

```js
even(error?: Error): Validator<number>
```
Checks number to be an even one.    Type: validator. Returns input value on success.

### `float`

```js
float(error?: Error): Validator<number>
```
Checks number to be float.    Type: validator. Returns input value on success.

### `hex`

```js
hex(error?: Error): Validator<string>
```
Checks if the string is a hexadecimal number.    Type: validator. Returns input value on success.

### `integer`

```js
integer(error?: Error): Validator<number>
```
Checks number to be an integer.    Type: validator. Returns input value on success.

### `lowercase`

```js
lowercase(error?: Error): Validator<string>
```
Checks string to be in a lower case.    Type: validator. Returns input value on success.

### `negative`

```js
negative(error?: Error): Validator<number>
```
Checks number to be negative.    Type: validator. Returns input value on success.

### `notContains`

```js
notContains(seed: any, error?: Error): Validator<string | Array<any>>
```
Checks if the string or array does not contain the seed.    Type: validator. Returns input value on success.

### `number`

```js
number(error?: Error): Validator<string>
```
Checks for number type.    Type: validator. Returns input value on success.

### `oct`

```js
oct(error?: Error): Validator<string>
```
Checks if the string is a octal number.    Type: validator. Returns input value on success.

### `positive`

```js
positive(error?: Error): Validator<number>
```
Checks number to be positive.    Type: validator. Returns input value on success.

### `string`

```js
string(error?: Error): Validator<string>
```
Checks for string type.    Type: validator. Returns input value on success.

### `unique`

```js
unique<T>(field?: string | number | ((value: T) => any), error?: Error): Validator<Array<T>>
```
Checks array's elements to be unique.    Type: validator. Returns input value on success.

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

### `uppercase`

```js
uppercase(error?: Error): Validator<string>
```
Checks string to be in an upper case.    Type: validator. Returns input value on success.

### `url`

```js
url(error?: Error): Validator<string>
```
URL validation.    Type: validator. Returns input value on success.

### `uuid`

```js
uuid(error?: Error): Validator<string>
```
UUID validation.    Type: validator. Returns input value on success.

## `Processors`
### `clamp`

```js
clamp<T>(min: T, max: T): Validator<T, T>
```
Clamps value to required boundaries.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

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

### `erase`

```js
erase<T>(): Validator<T, null>
```
Erase input.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

### `repeat`

```js
repeat(count: number): Validator<string, string>
```
Repeats the string.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

### `round`

```js
round(method?: 'floor' | 'ceil'): Validator<number, number>
```
Round input number with specific method.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

### `toLower`

```js
toLower(): Validator<string, string>
```
Lowercase input string.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

### `toUpper`

```js
toUpper(): Validator<string, string>
```
Uppercase input string.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

### `trim`

```js
trim(method?: 'left' | 'right'): Validator<string, string>
```
Trim input string with specific method.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.

