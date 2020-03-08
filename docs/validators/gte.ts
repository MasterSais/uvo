/**
 * @name {gte<T>(bound: T, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be greater or equal to 'match' param. Requires the same type.
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
import * as v from 'barideta';

v.gte(0)(1);
// => 1

v.gte('0')('1');
// => '1'

v.gte(false)(true);
// => true

v.gte(0)(-1);
// => null

v.gte('b')('a');
// => null

v.gte(true)(false);
// => null