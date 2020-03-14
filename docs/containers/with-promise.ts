/**
 * @name {withPromise}
 * 
 * @scheme {withPromise<T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Array<Error>>>}
 * 
 * @desc Convert result to promise. Use it for async validation.
 * 
 * {@link docs/type-container}
 * 
 * @param {Validator} validator Validator.
 * 
 * {@link docs/validator-result}
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
  // => ['ERR']
}