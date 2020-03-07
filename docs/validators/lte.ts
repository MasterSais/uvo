/**
 * @name {lte<T>(bound: T, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be lower or equal to 'match' param. Requires the same type.
 * 
 * {@link docs/type-validator}
 * 
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'bound' is invalid.
 */

//#example
import * as v from 'usov';

v.lte(2)(1);
// => 1

v.lte('2')('1');
// => '1'

v.lte(true)(true);
// => true

v.lte(0)(1);
// => null

v.lte('a')('b');
// => null

v.lte(false)(true);
// => null