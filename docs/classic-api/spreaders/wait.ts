/**
 * @name {wait}
 * 
 * @template {`@wait` `@w`}
 * 
 * @scheme {wait<T>(name: string): Validator<T, Promise<T>>}
 * 
 * @desc Waits for specified promise.
 * 
 * {@link docs/classic-api/type-spreader}
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