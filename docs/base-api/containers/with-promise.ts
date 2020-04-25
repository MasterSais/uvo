/**
 * @name {withPromise}
 * 
 * @template {`~promise` `~p`}
 * 
 * @scheme {withPromise<T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Result<R>>>}
 * 
 * @desc Convert result to promise. Use it for async validation.
 * 
 * {@link docs/base-api/type-container}
 * 
 * @param {Validator} validator Validator.
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'validator' is invalid.
 */

//#example
import * as v from 'uvo';

const unchi = (
  v.withPromise(
    v.number('ERR')
  )
);

await unchi(10);
// => 10

await unchi('abc'); // error only works with 'withError' container.
// => null

const withErrorUnchi = (
  v.withPromise(
    v.withErrors(
      v.number('ERR')
    )
  )
);

await withErrorUnchi(10);
// => 10

try {
  await withErrorUnchi('abc');
} catch (errors) {
  // => { result: null, errors: ['ERR'] }
}