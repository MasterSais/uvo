/**
 * @name {promise}
 * 
 * @template {`@async` `@a`}
 * 
 * @scheme {promise<T>(error?: Error): Validator<Promise<T>, Promise<T>>}
 * 
 * @desc Checks value to be a promise.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */

//#example
import * as v from 'uvo';

// Validate promise and object as it's result.
v.withPromise(
  v.consecutive(
    v.promise(),
    v.object2([
      ['id', v.number()],
      ['name', v.string()],
    ])
  )
);

// Validate array of promises.
v.withMeta(
  v.withPromise(
    v.array([v.promise(), v.number()])
  )
);