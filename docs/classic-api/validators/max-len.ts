/**
 * @name {maxLen}
 * 
 * @scheme {maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @shortcut {is(value => value.length >= len)}
 * 
 * @desc Checks length to be equal to 'len' param. Requires to be an object like or string.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * @param {number} len Reference length. Positive finite number.
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'len' is invalid.
 */

//#example
import * as v from 'uvo';

v.maxLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.maxLen(3)([0, 1, 2, 3]);
// => null

v.maxLen(3)('abc');
// => 'abc'

v.maxLen(3)({ length: 3 });
// => { length: 3 }