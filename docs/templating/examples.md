#### `Base example`

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