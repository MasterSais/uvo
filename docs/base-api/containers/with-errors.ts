/**
 * @name {withErrors}
 * 
 * @template {`~error(...)` `~e(...)`}
 * 
 * @scheme {withErrors<T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: ValidatorError, meta?: MetaData) => ValidatorError)): Validator<T, Result<R>>}
 * 
 * @desc Provides error handling mechanism.
 * 
 * {@link docs/base-api/type-container}
 * 
 * @param {Validator} validator Validator.
 * 
 * @param {Function=} commonErrorProcessor Common error processor.
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'validator' is invalid.
 */

//#example
import * as v from 'uvo';

const unchi = (
  v.withErrors(
    v.parallel(
      v.lte(10, 'ERR1'),
      v.gte(0, 'ERR2'),
      v.integer('ERR3')
    )
  )
);

unchi(10);
// => { result: 10, errors: null }

unchi(-1);
// => { result: null, errors: ['ERR2'] }

unchi(11);
// => { result: null, errors: ['ERR1'] }

unchi(11.2);
// => { result: null, errors: ['ERR1', 'ERR3'] }