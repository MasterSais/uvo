All examples use advanced object schema 'object2' as recommended solution.

### `Schema with custom user errors`

Custom error on each validator:
```js
v.withErrors(
  v.object2([
    ['id',
      v.notEmpty('Empty id'),
      v.number('Not a number'),
      v.parallel(
        v.gte(0, 'Must not be negative'),
        v.integer('Must be an integer')
      )
    ],
    ['name',
      v.notEmpty('Empty name'),
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
      v.notEmpty(),
      v.number('Custom error message'), // wanna add some info for common error processor?
      v.parallel(
        v.gte(0),
        v.integer()
      )
    ],
    ['name',
      v.notEmpty(),
      v.string(),
      v.minLen(10)
    ]
  ]), ({ path, validator }, error) => ({ path, validator, error }) // catches all errors in the schema.
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