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