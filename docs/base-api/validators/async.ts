/**
 * @name {async}
 * 
 * @template {`@async(...)` `@p(...)`}
 * 
 * @scheme {async<T>(name?: string, error?: Error): Validator<Promise<T>, Promise<T>>}
 * 
 * @desc Settles value to async storage. Can be awaited somewhere later.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
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
          id: [v.number(), v.setRef('userId')],
          name: [v.string()]
        })
      )],
      ['roles',
        v.wait('user'), // Wait for 'user' promise.
        v.getRef('userId'),
        // (userId: number) => e.g. request roles
      ],
    ])
  )
);