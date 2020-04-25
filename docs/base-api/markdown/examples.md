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
    ['id', v.number(), v.gte(0), v.setDep('isIdValid', true)],
    ['name', getDep(
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