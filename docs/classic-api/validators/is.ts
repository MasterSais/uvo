/**
 * @name {is}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {is<T>(comparator: ((value: T) => boolean), error?: Error): Validator<T>}
 * 
 * @desc Checks value with custom comparator.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * @param {Function} comparator Custom comparator. 
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'comparator' is invalid.
 */

//#example
import * as v from 'uvo';

v.is((value: number) => value === 10)(10);
// => 10

v.is((value) => value === 10)('10');
// => null