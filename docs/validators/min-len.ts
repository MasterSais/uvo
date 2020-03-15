/**
 * @name {minLen}
 * 
 * @scheme {minLen<T extends Lengthy>(len: number, error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @shortcut {length(len, 'gte')}
 * 
 * @desc Checks length to be equal to 'len' param. Requires to be an object like or string.
 * 
 * {@link docs/type-validator}
 * 
 * @param {number} len Reference length. Positive finite number.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'len' is invalid.
 */

//#example
import * as v from 'uvo';

v.minLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.minLen(3)([0, 1]);
// => null

v.minLen(3)('abc');
// => 'abc'

v.minLen(3)({ length: 3 });
// => { length: 3 }