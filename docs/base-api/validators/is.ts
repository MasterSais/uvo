/**
 * @name {is}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {is<T>(comparator: ((value: T) => boolean), error?: ValidatorError): Validator<T>}
 * 
 * @desc Checks value with custom comparator.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * @param {Function} comparator Custom comparator. 
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'comparator' is invalid.
 */

//#example
import * as v from 'uvo';

v.is((value: number) => value === 10)(10);
// => 10

v.is((value) => value === 10)('10');
// => null