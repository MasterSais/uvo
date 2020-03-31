New templating api provides string based validators creation.

Apis: `object`, `array`, `number`, `string`, `bool`, `date`, `compare` and `length`.

Comparators for `length` and `compare`: `>` `>=` `<` `<=` `=` `!=` `%` (multiple to) `!%` (not multiple to)

```js
import { template } from 'uvo/template';

const validator = template(`
  [object( 
    [id : number : compare(>0) : compare(<=100)]
    [name : string : length(>=10)]
    [roles : array(
      [string : length(<8)]
    )]
  )]
`);

validator({ id: 1, name: 'MasterSais', roles: ['Admin'] });
// => { id: 1, name: 'MasterSais', roles: ['Admin'] }

validator({ id: -1, name: 'Master' });
// => { id: null, name: null, roles: null }

validator({ id: -1, name: 'Master', roles: ['NotAdmin'] });
// => { id: null, name: null, roles: [null] }
```