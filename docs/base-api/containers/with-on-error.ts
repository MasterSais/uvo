/**
 * @name {withOnError}
 * 
 * @scheme {withOnError<T, R>(errorProcessor: ErrorCallback, ...validators: Array<Validator<any, T>>): Validator<T, R>}
 * 
 * @desc Provides custom error handler.
 * 
 * {@link docs/base-api/type-container}
 * 
 * @param {Function} errorProcessor ValidatorError processor.
 * 
 * @param {...Processor} validators Validators list.
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'errorProcessor' or 'validators' is invalid.
 */

//#example
import * as v from 'uvo';

const unchi = (
  v.withOnError(
    (error) => { console.error(error); },
    v.parallel(
      v.lte(10, 'ERR1'),
      v.gte(0, 'ERR2'),
      v.integer('ERR3')
    )
  )
);

unchi(10);
// => 10

unchi(-1);
// => null
// console.error => 'ERR2'

unchi(11);
// => null
// console.error => 'ERR1'

unchi(11.2);
// => null
// console.error => 'ERR1'
// console.error => 'ERR3'