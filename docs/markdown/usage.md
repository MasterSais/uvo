```js
import * as v from 'usov'; // for everything (recommended in all cases for better minification result e.g. in webpack)
// or
import { number, array } from 'usov'; // for only what you need
```

```js
import * as v from 'usov';

v.number()(10)
// => 10

v.number()('abc')
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
})
// => { id: 3, name: 'YourAwesomeUserName', role: null }
```