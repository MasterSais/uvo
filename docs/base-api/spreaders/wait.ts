/**
 * @name {wait}
 * 
 * @template {`@wait(...)` `@w(...)`}
 * 
 * @scheme {wait<T>(name: string): Validator<T, Promise<T>>}
 * 
 * @desc Waits for specified promise.
 * 
 * {@link docs/base-api/type-spreader}
 * 
 * {@link docs/base-api/validator-result}
 */

//#example
import * as v from 'uvo';

v.withMeta(
  v.withPromise(
    v.object2([
      ['user', v.async('user'), ( // Settle 'user' promise.
        v.object({
          id: [v.number(), v.setDep('userId')],
          name: [v.string()]
        })
      )],
      ['roles',
        v.wait('user'), // Wait for 'user' promise.
        v.getDep('userId'),
        // (userId: number) => e.g. request roles
      ],
    ])
  )
);