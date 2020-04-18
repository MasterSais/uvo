# `UVO`

UVO is a javascript universal validation library. The main goal is to provide schema creation tool for convenient and flexible form's validation with the only one call. Schema can represent either simple form with few fields or huge one with a big amount of cross form validations, recursive descents, different conditions and custom data processing.

UVO wants to be a pretty small size library, so each validator represented as separated module and can be skipped during treeshaking stage in your bundler (e.g. `webpack`). Only `templating API` represented as one indivisible bundle.

UVO wants to be a flexible and comprehensive library, so `uvo/extended` will coming soon with a huge base of specific validators such as `email`, `uri`, `guid` and so on.

UVO bundles:
  - Classic API: `esm ~7.1kb`, `cjs ~7.3kb`, `umd ~10.1kb`
  - Templating Api: `esm ~8.5kb`

UVO has own types definition file for `typescript`.

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

scheme(10.5);   // => { result: 10.5, errors: null }
scheme(10);     // => { result: 10, errors: ['err3'] }
scheme(1000);   // => { result: 10, errors: ['err2', 'err3'] }
scheme('str');  // => { result: 10, errors: ['err1'] }
```

You can provide not only literal for error, but function. Function will be called with meta data (if `withMeta` provided) which contains `path` and `validator` for occured error. Grouper `parallel` provides nonsequential validation and you can collect all errors from it. Also you can use `or` grouper, if value type can be different.

We have overviewed only basic features. For more information see `API documentation`.

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
Error can be provided via `!` literal after validator.
Cross form validations and errors:

```js
template(`
  @object(
    createdAt : @date : @compare( >=$0 ) : #createdAt,
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

## `API`

|Classic API|Templating API|Description|
|:-|:-|:-|
|[array][array-url]|@array(@a)|Checks value to be an array.|
|[bool][bool-url]|-|Checks value to be a boolean compatible.|
|[date][date-url]|-|Checks value to be a date compatible. Result in ms.|
|[defined][defined-url]|-|Checks value to be defined.|
|[empty][empty-url]|-|Checks value to be empty.|
|[equal][equal-url]|-|Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.|
|[even][even-url]|-|Checks number to be an even one.|
|[fields][fields-url]|-|Checks for fields in the input object.|
|[gte][gte-url]|-|Checks value to be greater or equal to 'bound' param. Requires the same type.|
|[integer][integer-url]|-|Checks number to be an integer.|
|[is][is-url]|-|Checks value with custom comparator.|
|[length][length-url]|-|Compares length with 'len' param. Requires to be an object like or string.|
|[lte][lte-url]|-|Checks value to be lower or equal to 'bound' param. Requires the same type.|
|[maxLen][maxLen-url]|-|Checks length to be equal to 'len' param. Requires to be an object like or string.|
|[minLen][minLen-url]|-|Checks length to be equal to 'len' param. Requires to be an object like or string.|
|[multiple][multiple-url]|-|Checks number to be an integer.|
|[number][number-url]|-|Checks value to be a number compatible.|
|[object][object-url]|-|Checks value to be an object.|
|[object2][object2-url]|-|Checks value to be an object. Provides strict ordering.  Each key can be a Regex.|
|[oneOf][oneOf-url]|-|Checks value to be one of expected. Shallow comparison.|
|[regex][regex-url]|-|Checks value to match a pattern.|
|[string][string-url]|-|Checks value to be a string compatible.|
|[unique][unique-url]|-|Checks array's elements to be unique.|
|[clamp][clamp-url]|-|Clamps value to required boundaries.|
|[erase][erase-url]|-|Erase input.|
|[keysMap][keysMap-url]|-|Maps object keys with custom mapper.|
|[lowercase][lowercase-url]|-|Lowercase input string.|
|[random][random-url]|-|Returns random value according to params.|
|[round][round-url]|-|Round input number with specific method.|
|[strip][strip-url]|-|Removes field from object conditionally.|
|[trim][trim-url]|-|Trim input string with specific method.|
|[uppercase][uppercase-url]|-|Uppercase input string.|
|[valueMap][valueMap-url]|-|Maps value with custom mappers.|
|[consecutive][consecutive-url]|-|Groups validators sequentially.  Passes value through a sequence of validators until an error occurs.  Uses by default in 'object' and 'object2' validator's scheme for fields.|
|[or][or-url]|-|Groups validators sequentially.  Searches for first successful validator's result.|
|[parallel][parallel-url]|-|Groups validators in parallel.  The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).  Beware of using processors inside.|
|[transform][transform-url]|-|Groups processors sequentially.  Passes value through a sequence of processors.  Takes only processors (doesn't check errors).|
|[withErrors][withErrors-url]|-|Provides error handling mechanism.|
|[withFallback][withFallback-url]|-|Provides fallback value on error.|
|[withMeta][withMeta-url]|-|Provides meta structure. Can catch scheme logs.|
|[withOnError][withOnError-url]|-|Provides custom error handler.|
|[withPromise][withPromise-url]|-|Convert result to promise. Use it for async validation.|
|[dynamic][dynamic-url]|-|Inserts new validators into scheme dynamically.|
|[getDep][getDep-url]|-|Takes value from spreaded structure.  Might be used for dynamic validators creation.  If 'preValidator' not provided, just replaces current value.  Works only with provided meta object.|
|[setDep][setDep-url]|-|Puts value into spreaded structure.  If 'extValue' is provided, puts it instead of current value. i.e. reference api.|
|[setVDep][setVDep-url]|-|Puts validators into spreaded structure.  Might be used for recursive schemes.|
|[useDefault][useDefault-url]|-|Puts default value into spreaded structure.  If input value is empty, puts default value instead, otherwise validates input values with provided validators.  If you need fallback value on error use 'withFallback' container instead.|

[array-url]: ./api.md#array
[bool-url]: ./api.md#bool
[date-url]: ./api.md#date
[defined-url]: ./api.md#defined
[empty-url]: ./api.md#empty
[equal-url]: ./api.md#equal
[even-url]: ./api.md#even
[fields-url]: ./api.md#fields
[gte-url]: ./api.md#gte
[integer-url]: ./api.md#integer
[is-url]: ./api.md#is
[length-url]: ./api.md#length
[lte-url]: ./api.md#lte
[maxLen-url]: ./api.md#maxLen
[minLen-url]: ./api.md#minLen
[multiple-url]: ./api.md#multiple
[number-url]: ./api.md#number
[object-url]: ./api.md#object
[object2-url]: ./api.md#object2
[oneOf-url]: ./api.md#oneOf
[regex-url]: ./api.md#regex
[string-url]: ./api.md#string
[unique-url]: ./api.md#unique
[clamp-url]: ./api.md#clamp
[erase-url]: ./api.md#erase
[keysMap-url]: ./api.md#keysMap
[lowercase-url]: ./api.md#lowercase
[random-url]: ./api.md#random
[round-url]: ./api.md#round
[strip-url]: ./api.md#strip
[trim-url]: ./api.md#trim
[uppercase-url]: ./api.md#uppercase
[valueMap-url]: ./api.md#valueMap
[consecutive-url]: ./api.md#consecutive
[or-url]: ./api.md#or
[parallel-url]: ./api.md#parallel
[transform-url]: ./api.md#transform
[withErrors-url]: ./api.md#withErrors
[withFallback-url]: ./api.md#withFallback
[withMeta-url]: ./api.md#withMeta
[withOnError-url]: ./api.md#withOnError
[withPromise-url]: ./api.md#withPromise
[dynamic-url]: ./api.md#dynamic
[getDep-url]: ./api.md#getDep
[setDep-url]: ./api.md#setDep
[setVDep-url]: ./api.md#setVDep
[useDefault-url]: ./api.md#useDefault