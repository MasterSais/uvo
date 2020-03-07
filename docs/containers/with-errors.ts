/**
 * @name {withErrors<T, R>(validator: Processor<T, R>, commonErrorProcessor?: ((meta?: MetaData) => Error)): Processor<T, Result<R>>}
 * 
 * @desc Provides error handling mechanism.
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