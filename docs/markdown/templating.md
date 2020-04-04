New templating api provides string based validators creation.

Apis: `object | o`, `array | a`, `number | n`, `string | s`, `bool | b`, `date | d`, `compare | c` and `length | l`.

Comparators for `length` and `compare`: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)

Symbol `$` declares injection name.

Symbol `#` sets or gets reference.

```js
import { template } from 'uvo/template';

const validator = template(`
  @object(
    id : @number : @compare(>$min) : @compare(<=$max),
    name : @string : @length(>=10),
    roles : @array(
      @string : @length(<8)
    )
  )
`)(/* containers here. will be removed */)({
  min: 0,
  max: () => 100
});

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
`(/* containers here. will be removed */)([0, () => 100]);
```