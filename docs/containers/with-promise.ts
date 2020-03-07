/**
 * @name {withPromise<T, R>(validator: Processor<T, R | Result<R>>): Processor<T, Promise<R | Array<Error>>>}
 * 
 * @desc Convert result to promise.
 * 
 * {@link docs/type-container}
 * 
 * @param {Processor} validator Validator.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'validator' is invalid.
 */

//#example
import * as v from 'usov';

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