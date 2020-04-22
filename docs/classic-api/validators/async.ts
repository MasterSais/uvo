/**
 * @name {async}
 * 
 * @template {`@async` `@a`}
 * 
 * @scheme {promise<T>(name: string, error?: Error): Validator<Promise<T>, Promise<T>>}
 * 
 * @desc Checks value to be a promise. Settles value to async storage. Can be awaited somewhere later.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 */

//#example
import * as v from 'uvo';

// Validate promise and object as it's result.
v.withPromise(
  v.consecutive(
    v.async('objPromise'),
    v.object2([
      ['id', v.number()],
      ['name', v.string()],
    ])
  )
);

// Validate array of promises.
v.withMeta(
  v.withPromise(
    v.array([v.async(), v.number()])
  )
);