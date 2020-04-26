# `Uvo`

Uvo is a javascript universal validation library. The main goal is to provide schema creation tool for convenient and flexible form's validation with the only one call. Schema can represent either simple form with few fields or huge one with a big amount of cross form validations, recursive descents, different conditions and custom data processing.

Uvo wants to be a pretty small size library, so each validator represented as separated module and can be skipped during treeshaking stage in your bundler (e.g. `webpack`). Only `templating API` represented as one indivisible bundle.

Uvo wants to be a flexible and comprehensive library, so `uvo/extended` will coming soon with a huge base of specific validators such as `email`, `uri`, `guid` and so on. Also uvo supports asynchronous validations.

|Bundles (minified)|esm|cjs|
|:-:|:-:|:-:|
|Base API|~7.7kb|~8kb|
|Templating API|~9.5kb|~9.6kb|

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
```

or

```js
const v = require( 'uvo' );
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
      v.setDep( 'createdAt' )
    ],
    ['modifiedAt', 
      v.date(), 
      v.getDep( 'createdAt', createdAt => createdAt && v.gte( createdAt ) ),
      v.setDep( 'modifiedAt' )
    ],
    ['deletedAt',
      v.date(), 
      v.getDep( 'modifiedAt', modifiedAt => modifiedAt && v.gte( modifiedAt + 60 * 1000 ) )
    ]
  ])
);
```

In the above schema we use `setDep` and `getDep` (i.e. referencing) to compare fields to each other.
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
          id: [v.number(), v.setDep( 'userId' )],
          name: [v.string()]
        })
      ],
      ['roles',
        v.wait( 'user' ), // Wait for 'user' promise here.
        v.getDep( 'userId' ),
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

// Errors
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
|[array][array-url]|`@array(...)` `@a(...)`|Checks value to be an array.|
|[async][async-url]|`@async(...)` `@p(...)`|Settles value to async storage. Can be awaited somewhere later.|
|[bool][bool-url]|`@bool` `@b`|Checks value to be a boolean compatible.|
|[date][date-url]|`@date` `@d`|Checks value to be a date compatible. Result in ms.|
|[defined][defined-url]|`@compare(=def)` `@c(=def)`|Checks value to be defined.|
|[empty][empty-url]|`@compare(=emp)` `@c(=emp)` `@compare(!=emp)` `@c(!=emp)`|Checks value to be empty.|
|[equal][equal-url]|`@compare(=...)` `@c(=...)` `@compare(!=...)` `@c(!=...)`|Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.|
|[even][even-url]|`@compare(%2)` `@c(%2)` `@compare(!%2)` `@c(!%2)`|Checks number to be an even one.|
|[fields][fields-url]||Checks for fields in the input object.|
|[gte][gte-url]|`@compare(>=...)` `@c(>=...)`|Checks value to be greater or equal to 'bound' param. Requires the same type.|
|[integer][integer-url]|`@compare(%1)` `@c(%1)` `@compare(!%1)` `@c(!%1)`|Checks number to be an integer.|
|[is][is-url]|injected function via `$...`|Checks value with custom comparator.|
|[length][length-url]|`@length(=...)` `@l(=...)` `@length(!=...)` `@l(!=...)`|Compares length with 'len' param. Requires to be an object like or string.|
|[lte][lte-url]|`@compare(<=...)` `@c(<=...)`|Checks value to be lower or equal to 'bound' param. Requires the same type.|
|[maxLen][maxLen-url]|`@length(<=...)` `@l(<=...)`|Checks length to be equal to 'len' param. Requires to be an object like or string.|
|[minLen][minLen-url]|`@length(>=...)` `@l(>=...)`|Checks length to be equal to 'len' param. Requires to be an object like or string.|
|[multiple][multiple-url]|`@compare(%...)` `@c(%...)` `@compare(!%...)` `@c(!%...)`|Checks number to be an integer.|
|[number][number-url]|`@number` `@n`|Checks value to be a number compatible.|
|[object][object-url]|`@object(...)` `@o(...)`|Checks value to be an object.|
|[object2][object2-url]|`@object(...)` `@o(...)`|Checks value to be an object. Provides strict ordering.  Each key can be a Regex.|
|[oneOf][oneOf-url]|`@compare(->...)` `@c(->...)` `@compare(!->...)` `@c(!->...)`|Checks value to be one of expected. Shallow comparison.|
|[regex][regex-url]|`@compare(*...)` `@c(*...)` `@compare(!*...)` `@c(!*...)`|Checks value to match a pattern.|
|[string][string-url]|`@string` `@s`|Checks value to be a string compatible.|
|[unique][unique-url]||Checks array's elements to be unique.|
|[clamp][clamp-url]|injected function via `$...`|Clamps value to required boundaries.|
|[erase][erase-url]|injected function via `$...`|Erase input.|
|[keysMap][keysMap-url]||Maps object keys with custom mapper.|
|[lowercase][lowercase-url]|injected function via `$...`|Lowercase input string.|
|[random][random-url]|injected function via `$...`|Returns random value according to params.|
|[round][round-url]|injected function via `$...`|Round input number with specific method.|
|[strip][strip-url]||Removes field from object conditionally.|
|[trim][trim-url]|injected function via `$...`|Trim input string with specific method.|
|[uppercase][uppercase-url]|injected function via `$...`|Uppercase input string.|
|[valueMap][valueMap-url]||Maps value with custom mappers.|
|[consecutive][consecutive-url]|`<( ... )>`|Groups validators sequentially.  Passes value through a sequence of validators until an error occurs.  Uses by default in 'object' and 'object2' validator's scheme for fields.|
|[or][or-url]|`<[ ... ]>`|Groups validators sequentially.  Searches for first successful validator's result.|
|[parallel][parallel-url]|`<{ ... }>`|Groups validators in parallel.  The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).  Beware of using processors inside.|
|[transform][transform-url]||Groups processors sequentially.  Passes value through a sequence of processors.  Takes only processors (doesn't check errors).|
|[withErrors][withErrors-url]|`~error(...)` `~e(...)`|Provides error handling mechanism.|
|[withFallback][withFallback-url]||Provides fallback value on error.|
|[withMeta][withMeta-url]|`~meta(...)` `~m(...)`|Provides meta structure. Can catch scheme logs.|
|[withOnError][withOnError-url]||Provides custom error handler.|
|[withPromise][withPromise-url]|`~promise` `~p`|Convert result to promise. Use it for async validation.|
|[dynamic][dynamic-url]|conditional validation via `?` or injection via `$...`|Inserts new validators into scheme dynamically.|
|[getDep][getDep-url]|as parameter via `#...` or as validators via `##...`|Takes value from spreaded structure.  Might be used for dynamic validators creation.  If 'preValidator' not provided, just replaces current value.  Works only with provided meta object.|
|[setDep][setDep-url]|`#...`|Puts value into spreaded structure.  If 'extValue' is provided, puts it instead of current value. i.e. reference api.|
|[setVDep][setVDep-url]|`#...(...)`|Puts validators into spreaded structure.  Might be used for recursive schemes.|
|[useDefault][useDefault-url]||Puts default value into spreaded structure.  If input value is empty, puts default value instead, otherwise validates input values with provided validators.  If you need fallback value on error use 'withFallback' container instead.|
|[wait][wait-url]|`@wait(...)` `@w(...)`|Waits for specified promise.|

[array-url]: API.md#array
[async-url]: API.md#async
[bool-url]: API.md#bool
[date-url]: API.md#date
[defined-url]: API.md#defined
[empty-url]: API.md#empty
[equal-url]: API.md#equal
[even-url]: API.md#even
[fields-url]: API.md#fields
[gte-url]: API.md#gte
[integer-url]: API.md#integer
[is-url]: API.md#is
[length-url]: API.md#length
[lte-url]: API.md#lte
[maxLen-url]: API.md#maxLen
[minLen-url]: API.md#minLen
[multiple-url]: API.md#multiple
[number-url]: API.md#number
[object-url]: API.md#object
[object2-url]: API.md#object2
[oneOf-url]: API.md#oneOf
[regex-url]: API.md#regex
[string-url]: API.md#string
[unique-url]: API.md#unique
[clamp-url]: API.md#clamp
[erase-url]: API.md#erase
[keysMap-url]: API.md#keysMap
[lowercase-url]: API.md#lowercase
[random-url]: API.md#random
[round-url]: API.md#round
[strip-url]: API.md#strip
[trim-url]: API.md#trim
[uppercase-url]: API.md#uppercase
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
[getDep-url]: API.md#getDep
[setDep-url]: API.md#setDep
[setVDep-url]: API.md#setVDep
[useDefault-url]: API.md#useDefault
[wait-url]: API.md#wait