/**
 * @name {is}
 * 
 * @scheme {is<T>(comparator: ((value: T) => boolean), error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @desc Checks value with custom comparator. Can be inverted with .not call.
 * 
 * {@link docs/type-validator}
 * 
 * @param {Function} comparator Custom comparator. 
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'comparator' is invalid.
 */

//#example
import * as v from 'uvo';

v.is((value: number) => value === 10)(10);
// => 10

v.is((value) => value === 10)('10');
// => null

v.is.not((value: number) => value === 10)(10);
// => null

v.is.not((value) => value === 10)('10');
// => '10'