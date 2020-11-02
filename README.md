# `Uvo`

Uvo is a javascript universal validation library. The main goal is to provide schema creation tool for convenient and flexible form's validation with the only one call. Schema can represent either simple form with few fields or huge one with a big amount of cross form validations, recursive descents, different conditions and custom data processing.

Uvo wants to be a pretty small size library, so each validator represented as separated module and can be skipped during treeshaking stage in your bundler (e.g. `webpack`). Only `templating API` represented as one indivisible bundle.

Uvo wants to be a flexible and comprehensive library, so `uvo/extended` will extend base api with a huge base of specific validators such as `email`, `url`, `guid` and so on. Also uvo supports asynchronous validations.

|Bundles (minified)|ESM|CJS|UMD|
|:-:|:-:|:-:|:-:|
|Base API|~6.8kb|~6.8kb|~6.5kb|
|Templating API|~9.7kb|~9.8kb|~9.9kb|
|Extended API|~2.9kb|~3kb|~2.9kb|
|Extended Template API|~4.8kb|~5kb|~5kb|

Uvo has own types definition file for `typescript`.

### `Installation`

Install with npm:
```sh
npm install uvo
```

Install with yarn:
```sh
yarn add uvo
```

### `Usage`

First of all let's import it:

```js
import * as v from 'uvo';
import * as e from 'uvo/extended';
```

or

```js
const v = require( 'uvo' );
const e = require( 'uvo/extended' );

// es5
const v = require( 'uvo/es5' );
const e = require( 'uvo/extended/es5' );
```

Each validator returns initial or converted value on success, otherwise `null`.

Single validator usage:

```js
v.number()( 10 );      // => 10
v.number()( '12.5' );  // => 12.5
v.number()( 'str' );   // => null
```

Lets group them in a sequence:

```js
v.consecutive( v.number(), v.gte( 0 ) )( 10 );      // => 10
v.consecutive( v.number(), v.gte( 0 ) )( -1 );      // => null
v.consecutive( v.number(), v.gte( 0 ) )( 'str' );   // => null
```

Simple form creation:

```js
v.object({
  id: [v.number(), v.gte( 0 ), v.integer()],
  name: [v.string(), v.trim(), v.minLen( 8 ), v.maxLen( 24 )],
  roles: [
    v.array([
      v.string(), v.regex( /^[A-Z]{5,20}$/ )
    ]),
    v.unique(),
    roles => roles.filter( role => role !== null )
  ]
});
```

In the example above you can see not only validators (namely `trim`). Library has `processor` modules which are only transform value into another. You can inject your custom processors and validators as we did for roles filtration.

Previous example use classic object scheme. It won't give us great flexibility in the future. Lets write new one with advanced object scheme:

```js
const now = () => Date.now();

v.object2([
  ['createdAt', v.date(), v.gte( now )],
  ['modifiedAt', v.date(), v.gte( now )],
  ['deletedAt', v.date(), v.gte( now )]
]);
```

Advanced scheme gives us some new features such as `keys aggregation` and `multiple stages for keys`.
Let's do this:

```js
v.object2([
  [['createdAt', 'modifiedAt', 'deletedAt'], v.date()], // process all dates via Array
  // ...
  [/.+(At)/, date => date.toISOString()] // process all dated via RegEx
]);
```

Now we will always use `object2` scheme as recommended by default.

The next step is about cross form validations. For this issue we must use `containers`.
The most important containers: `withMeta`, `withErrors`, `withPromise`.

```js
v.withMeta(
  v.object2([
    ['createdAt', 
      v.date(), 
      v.gte( () => Date.now() ), 
      v.setRef( 'createdAt' )
    ],
    ['modifiedAt', 
      v.date(), 
      v.getRef( 'createdAt', createdAt => createdAt && v.gte( createdAt ) ),
      v.setRef() // Imlicitly sets into 'modifiedAt' via field's path concatenation.
    ],
    ['deletedAt',
      v.date(), 
      v.getRef( 'modifiedAt', modifiedAt => modifiedAt && v.gte( modifiedAt + 60 * 1000 ) )
    ]
  ])
);
```

In the above schema we use `setRef` and `getRef` (i.e. referencing) to compare fields to each other.
In that case we must use `withMeta` container. It provides global data storage for scheme, allows us to use references and stores meta data for errors.

What about errors? Each validator takes an additional parameter for error. Me must use `withErrors` container for errors accumulation from scheme.

```js
const scheme = (
  v.withErrors(
    v.consecutive(
      v.number( 'err1' ),
      v.parallel(
        v.lte( 100, 'err2' ),
        v.integer.not( 'err3' )
      )
    )
  )
);

scheme( 10.5 );   // => { result: 10.5, errors: null }
scheme( 10 );     // => { result: 10, errors: ['err3'] }
scheme( 1000 );   // => { result: 10, errors: ['err2', 'err3'] }
scheme( 'str' );  // => { result: 10, errors: ['err1'] }
```

You can provide not only literal for error, but function. Function will be called with meta data (if `withMeta` provided) which contains `path` and `validator` for occured error. Grouper `parallel` provides nonsequential validation and you can collect all errors from it. Also you can use `or` grouper, if value type can be different.

We have overviewed only basic features. For more information see [API documentation][api-url].

[api-url]: API.md

### `Async API`

Uvo provides flexible asynchronous validations. `withPromise` container makes entire scheme async.

```js
const validator = (
  v.withPromise(
    v.object2([
      ['id', v.number()],
      ['name', v.string()],
    ])
  )
);

validator(Promise.resolve({
  id: 1,
  name: 'name'
}));
// => { id: 1, name: 'name' }

// More promises
validator(Promise.resolve({
  id: Promise.resolve( 1 ),
  name: Promise.reject( 'error' )
}));
// => { id: 1, name: null }
```

All promises will be awaited implicitly in the scheme. If you want to catch errors or provide custom ones for promises, make sure to use `withErrors` container and `async` validator.
`withPromise` is a low level container, use it inside `withErrors` and `withMeta` containers.

```js
v.withErrors(
  v.withPromise(
    v.consecutive(
      v.async( null, 'promiseErr' ), // Will set 'promiseErr' on catch.
      v.object2([
        ['id',
          v.async(), // Will set promise error on catch.
          v.number()
        ],
        ['name',
          v.async( null, null ), // No error on catch. No sense.
          v.string()
        ],
      ])
    )
  )
);
```

One more important feature is cross promise validations with `async` and `wait`.
`withMeta` is required.

```js
v.withMeta(
  v.withPromise(
    v.object2([
      ['user', 
        v.async( 'user' ), // Name the promise with 'user'.
        v.object({
          id: [v.number(), v.setRef( 'userId' )],
          name: [v.string()]
        })
      ],
      ['roles',
        v.wait( 'user' ), // Wait for 'user' promise here.
        v.getRef( 'userId' ),
        (userId: number) => { /* do something asynchronous m.b. */ }
      ],
    ])
  )
);
```

### `Templates`

Library also has own templating API for advanced usage. Compiler for template minification in progress.
Let's rewrite all examples from above:

```js
import { template, tml } from 'uvo/template';

// base version
template( `...` )(
  { /* injections for template (object or array) */ },
  { /* errors for template (object or array) */ }
);

// short version
tml`...`(
  { /* injections for template (object or array) */ },
  { /* errors for template (object or array) */ }
);

// base number
template( `@number` )()( 10 ); // => 10

// short number
tml`@n`()( 'str' ); // => null
```

To provide validators from `uvo/extended` use `provide` function and builders from `uvo/extended-template`.

```js
import { provide, template } from 'uvo/template';
import { emailBuilder, urlBuilder, all } from 'uvo/extended-template';

provide([
  [emailBuilder, ['email']],
  [urlBuilder, ['url']]
]);

provide(all); // or provide all. Provides with the same name as in the 'uvo/extended'.

template(`@email`);

template(`@url`);
```

Templates has own universal comparator `@compare`. It replaces such validators as `gte`, `oneOf`, `regex` and so on.

```js
// long sequence
template( `@number : @compare( >=0 )` )()( 10 ); // => 10

// short sequence
tml`@n @c( >=0 )`()( NaN ); // => null
```

Literal `$` marks injections.
Our "simple form":

```js
template(`
  @object(
    id : @number : @compare( >=0, %1 ),
    name : @string : $trim : @length( >=8, <=24 ),
    roles 
      : @array(
          @string : @compare( *$roleRegEx )
        )
      : $uniqueVal
      : $filterNonNull
  )
`)({
  trim: name => name.trim(),    // template does not have such processor by itself
  roleRegEx: /^[A-Z]{5,20}$/,
  uniqueVal: null,              // `unique` validator for template in progress
  filterNonNull: roles => roles.filter( role => role !== null )
});

// short version
tml`
  @o(
    id @n @c( >=0, %1 ),
    name @s $0 @l( >=8, <=24 ),
    roles @a( @s @c( *$1 ) ) $2 $3
  )
`([
  name => name.trim(),
  /^[A-Z]{5,20}$/,
  null,
  roles => roles.filter( role => role !== null )
]);

template(`
  @object(
    $0 : @date,
    $1 : $2,
  )
`)([
  ['createdAt', 'modifiedAt', 'deletedAt'],
  /.+(At)/,
  date => date.toISOString()
]);
```

Groupers in templates have own syntax (e.g. `parallel` - `<{ }>`).

Literal `#...` sets current value into reference. If name is not provided, the latest path node will be used from `meta`. 

Error can be provided via `!` literal after validator.

Cross form validations and errors:

```js
template(`
  @object(
    createdAt : @date : @compare( >=$0 ) : #,
    modifiedAt : @date : @compare( >=#createdAt ) : #modifiedAt,
    deletedAt : @date : @compare( >=$1( #modifiedAt ) )
  ) ~meta
`)([
  () => Date.now(),
  modifiedAt => modifiedAt + 60 * 1000
]);

// short one
tml`
  @o(
    createdAt @d @c( >=$0 ) #0,
    modifiedAt @d @c( >=#0 ) #1,
    deletedAt @d @c( >=$1( #1 ) )
  ) ~m
`([
  () => Date.now(),
  modifiedAt => modifiedAt + 60 * 1000
]);

template(`
  @number!err1 : <{ @compare( <=100 )!err2 : @compare( !%1 )!err3 }> ~error
`)(
  null, 
  { err1: 'err1', err2: 'err2', err3: 'err3' }
);

// short
tml`
  @n!0 <{ @c( <=100 )!1 @c( !%1 )!2 }> ~e
`(
  null, 
  ['err1', 'err2', 'err3']
);
```

Async API in deed:

```js
template( `@array( @number ) ~promise` );

// ValidatorErrors
template(`
  @async!0 : @object(
    id : @async : @number,
    name : @string
  ) ~p ~e
`)(
  null, ['promiseErr']
);

// Cross promise validation
template(`
  @object(
    user : @async('user') : @object(
      id : @number : #userId,
      name : @string
    ),
    roles : @wait('user') : $0(#userId)
  ) 
  ~promise ~meta
`)(
  [
    (userId: number) => { /* do something asynchronous m.b. */ }
  ]
);
```

## `API`

|Base API|Templating API|Description|
|:-|:-|:-|
|[array][array-url]|`@array(...)` `@a(...)`|Checks value to be an array.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.|
|[async][async-url]|`@async(...)` `@p(...)`|Settles value to async storage. Can be awaited somewhere later.    Type: validator. Returns input value on success.|
|[bool][bool-url]|`@bool` `@b`|Checks value to be a boolean compatible. Converts on success. Use `bool` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.|
|[date][date-url]|`@date` `@d`|Checks value to be a date compatible. Result in ms. Converts on success. Use `date` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.|
|[fields][fields-url]||Checks for fields in the input object.    Type: validator. Returns input value on success.|
|[is][is-url]|injected function via `$...`|Checks value with custom comparator.    Type: validator. Returns input value on success.|
|[length][length-url]|`@length(=...)` `@l(=...)` `@length(!=...)` `@l(!=...)`|Compares length with 'len' param. Requires to be an object like or string.    Type: validator. Returns input value on success.|
|[multiple][multiple-url]|`@compare(%...)` `@c(%...)` `@compare(!%...)` `@c(!%...)`|Checks number to be an integer.    Type: validator. Returns input value on success.|
|[number][number-url]|`@number` `@n`|Checks value to be a number compatible. Converts on success. Use `number` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.|
|[object][object-url]|`@object(...)` `@o(...)`|Checks value to be an object.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.|
|[object2][object2-url]|`@object(...)` `@o(...)`|Checks value to be an object. Provides strict ordering.  Each key can be a Regex.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.|
|[string][string-url]|`@string` `@s`|Checks value to be a string compatible. Converts on success. Use `string` from `Extended API` for check only.    Type: semi validator, semi processor. If validation is successful, then converts value to proper type.|
|[keysMap][keysMap-url]||Maps object keys with custom mapper.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[strip][strip-url]||Removes field from object conditionally.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[valueMap][valueMap-url]||Maps value with custom mappers.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[consecutive][consecutive-url]|`<( ... )>`|Groups validators sequentially.  Passes value through a sequence of validators until an error occurs.  Uses by default in 'object' and 'object2' validator's scheme for fields.    Type: grouper. Groups validators into one.|
|[or][or-url]|`<[ ... ]>`|Groups validators sequentially.  Searches for first successful validator's result.    Type: grouper. Groups validators into one.|
|[parallel][parallel-url]|`<{ ... }>`|Groups validators in parallel.  The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).  Beware of using processors inside.    Type: grouper. Groups validators into one.|
|[transform][transform-url]||Groups processors sequentially.  Passes value through a sequence of processors.  Takes only processors (doesn't check errors).    Type: grouper. Groups validators into one.|
|[withErrors][withErrors-url]|`~error(...)` `~e(...)`|Provides error handling mechanism.    Type: container. Embraces validators. Provides additional input processing.|
|[withFallback][withFallback-url]|`@fallback(...)` `@f(...)`|Provides fallback value on error.    Type: container. Embraces validators. Provides additional input processing.|
|[withMeta][withMeta-url]|`~meta(...)` `~m(...)`|Provides meta structure. Can catch scheme logs.    Type: container. Embraces validators. Provides additional input processing.|
|[withOnError][withOnError-url]||Provides custom error handler.    Type: container. Embraces validators. Provides additional input processing.|
|[withPromise][withPromise-url]|`~promise` `~p`|Convert result to promise. Use it for async validation.    Type: container. Embraces validators. Provides additional input processing.|
|[dynamic][dynamic-url]|conditional validation via `?` or injection via `$...`|Inserts new validators into scheme dynamically.    Type: spreader. Spreads data through a validators scheme.|
|[getRef][getRef-url]|as parameter via `#...` or as validators via `##...`|Takes value from spreaded structure.  Might be used for dynamic validators creation.  If 'preValidator' not provided, just replaces current value.  Works only with provided meta object.    Type: spreader. Spreads data through a validators scheme.|
|[setRef][setRef-url]|`#...`|Puts value into spreaded structure.  If 'extValue' is provided, puts it instead of current value. i.e. reference api.    Type: spreader. Spreads data through a validators scheme.|
|[setVRef][setVRef-url]|`#...(...)`|Puts validators into spreaded structure.  Might be used for recursive schemes.    Type: spreader. Spreads data through a validators scheme.|
|[useDefault][useDefault-url]|`@default(...)`|Puts default value into spreaded structure.  If input value is empty, puts default value instead, otherwise validates input values with provided validators.  If you need fallback value on error use 'withFallback' container instead.    Type: spreader. Spreads data through a validators scheme.|
|[wait][wait-url]|`@wait(...)` `@w(...)`|Waits for specified promise.    Type: spreader. Spreads data through a validators scheme.|

[array-url]: API.md#array
[async-url]: API.md#async
[bool-url]: API.md#bool
[date-url]: API.md#date
[fields-url]: API.md#fields
[is-url]: API.md#is
[length-url]: API.md#length
[multiple-url]: API.md#multiple
[number-url]: API.md#number
[object-url]: API.md#object
[object2-url]: API.md#object2
[string-url]: API.md#string
[keysMap-url]: API.md#keysMap
[strip-url]: API.md#strip
[valueMap-url]: API.md#valueMap
[consecutive-url]: API.md#consecutive
[or-url]: API.md#or
[parallel-url]: API.md#parallel
[transform-url]: API.md#transform
[withErrors-url]: API.md#withErrors
[withFallback-url]: API.md#withFallback
[withMeta-url]: API.md#withMeta
[withOnError-url]: API.md#withOnError
[withPromise-url]: API.md#withPromise
[dynamic-url]: API.md#dynamic
[getRef-url]: API.md#getRef
[setRef-url]: API.md#setRef
[setVRef-url]: API.md#setVRef
[useDefault-url]: API.md#useDefault
[wait-url]: API.md#wait

## `Extended API`

|Base API|Templating API|Description|
|:-|:-|:-|
|[alpha][alpha-url]|via `provide`|Checks if the string contains only letters (a-zA-Z).    Type: validator. Returns input value on success.|
|[alphanum][alphanum-url]|via `provide`|Checks if the string contains only letters (a-zA-Z) and numbers.    Type: validator. Returns input value on success.|
|[bin][bin-url]|via `provide`|Checks if the string is a binary number.    Type: validator. Returns input value on success.|
|[bool][bool-url]|via `provide`|Checks for boolean type.    Type: validator. Returns input value on success.|
|[contains][contains-url]|via `provide`|Checks if the string or array contains the seed.    Type: validator. Returns input value on success.|
|[date][date-url]|via `provide`|Checks for right date.    Type: validator. Returns input value on success.|
|[emailFast][emailFast-url]|via `provide`|Fast email validation.    Type: validator. Returns input value on success.|
|[email][email-url]|via `provide`|Email validation.    Type: validator. Returns input value on success.|
|[even][even-url]|via `provide`|Checks number to be an even one.    Type: validator. Returns input value on success.|
|[float][float-url]|via `provide`|Checks number to be float.    Type: validator. Returns input value on success.|
|[hex][hex-url]|via `provide`|Checks if the string is a hexadecimal number.    Type: validator. Returns input value on success.|
|[integer][integer-url]|via `provide`|Checks number to be an integer.    Type: validator. Returns input value on success.|
|[lowercase][lowercase-url]|via `provide`|Checks string to be in a lower case.    Type: validator. Returns input value on success.|
|[negative][negative-url]|via `provide`|Checks number to be negative.    Type: validator. Returns input value on success.|
|[notContains][notContains-url]|via `provide`|Checks if the string or array does not contain the seed.    Type: validator. Returns input value on success.|
|[number][number-url]|via `provide`|Checks for number type.    Type: validator. Returns input value on success.|
|[oct][oct-url]|via `provide`|Checks if the string is a octal number.    Type: validator. Returns input value on success.|
|[positive][positive-url]|via `provide`|Checks number to be positive.    Type: validator. Returns input value on success.|
|[string][string-url]|via `provide`|Checks for string type.    Type: validator. Returns input value on success.|
|[unique][unique-url]|via `provide`|Checks array's elements to be unique.    Type: validator. Returns input value on success.|
|[uppercase][uppercase-url]|via `provide`|Checks string to be in an upper case.    Type: validator. Returns input value on success.|
|[url][url-url]|via `provide`|URL validation.    Type: validator. Returns input value on success.|
|[uuid][uuid-url]|via `provide`|UUID validation.    Type: validator. Returns input value on success.|
|[clamp][clamp-url]|via `provide`|Clamps value to required boundaries.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[erase][erase-url]|via `provide`|Erase input.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[repeat][repeat-url]|via `provide`|Repeats the string.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[round][round-url]|via `provide`|Round input number with specific method.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[toLower][toLower-url]|via `provide`|Lowercase input string.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[toUpper][toUpper-url]|via `provide`|Uppercase input string.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|
|[trim][trim-url]|via `provide`|Trim input string with specific method.    Type: processor. Processor does not check params' and values' types. Escape usage without validators.|

[alpha-url]: API.md#alpha
[alphanum-url]: API.md#alphanum
[bin-url]: API.md#bin
[bool-url]: API.md#bool
[contains-url]: API.md#contains
[date-url]: API.md#date
[emailFast-url]: API.md#emailFast
[email-url]: API.md#email
[even-url]: API.md#even
[float-url]: API.md#float
[hex-url]: API.md#hex
[integer-url]: API.md#integer
[lowercase-url]: API.md#lowercase
[negative-url]: API.md#negative
[notContains-url]: API.md#notContains
[number-url]: API.md#number
[oct-url]: API.md#oct
[positive-url]: API.md#positive
[string-url]: API.md#string
[unique-url]: API.md#unique
[uppercase-url]: API.md#uppercase
[url-url]: API.md#url
[uuid-url]: API.md#uuid
[clamp-url]: API.md#clamp
[erase-url]: API.md#erase
[repeat-url]: API.md#repeat
[round-url]: API.md#round
[toLower-url]: API.md#toLower
[toUpper-url]: API.md#toUpper
[trim-url]: API.md#trim

## `Performance`

Uvo is a pretty fast library for web apps. `uvo/template` will be dramatically optimized for BE usage in the future.
Tested with [this benchmark][benchmark].

[benchmark]: https://github.com/icebob/validator-benchmark

```
Platform info:
==============
   Windows_NT 10.0.18362 x64
   Node.JS: 12.16.1
   V8: 7.8.279.23-node.31
   Intel(R) Core(TM) i5-3317U CPU @ 1.70GHz × 4

Suite: Simple object
√ validator.js                253,025 rps
√ validate.js                 101,932 rps
√ validatorjs                  53,471 rps
√ joi                          25,926 rps
√ ajv                       2,100,936 rps
√ mschema                     198,256 rps
√ parambulator                  4,452 rps
√ fastest-validator         2,096,706 rps
√ yup                           5,903 rps
√ uvo                         300,253 rps

   validator.js            -87.96%        (253,025 rps)   (avg: 3μs)
   validate.js             -95.15%        (101,932 rps)   (avg: 9μs)
   validatorjs             -97.45%         (53,471 rps)   (avg: 18μs)
   joi                     -98.77%         (25,926 rps)   (avg: 38μs)
   ajv                          0%      (2,100,936 rps)   (avg: 475ns)
   mschema                 -90.56%        (198,256 rps)   (avg: 5μs)
   parambulator            -99.79%          (4,452 rps)   (avg: 224μs)
   fastest-validator         -0.2%      (2,096,706 rps)   (avg: 476ns)
   yup                     -99.72%          (5,903 rps)   (avg: 169μs)
   uvo                     -85.71%        (300,253 rps)   (avg: 3μs)
-----------------------------------------------------------------------
```