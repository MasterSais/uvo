/**
 * @name {maxLen}
 * 
 * @scheme {maxLen<T extends Lengthy>(len: number, error?: Error): Validator<T>}
 * 
 * @desc Checks length to be equal to 'len' param. Requires to be object like.
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

v.maxLen(3)([0, 1, 2]);
// => [0, 1, 2]

v.maxLen(3)([0, 1, 2, 3]);
// => null

v.maxLen(3)('abc');
// => 'abc'

v.maxLen(3)({ length: 3 });
// => { length: 3 }