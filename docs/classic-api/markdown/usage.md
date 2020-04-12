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