/**
 * @name {length}
 * 
 * @scheme {length<T extends Lengthy>(len: number, type: 'equal' | 'gte' | 'lte' = 'equal', error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @desc Compares length with 'len' param. Requires to be an object like or string.
 * Can be inverted with .not call.
 * 
 * {@link docs/type-validator}
 * 
 * @param {number} len Reference length. Positive finite number.
 * 
 * @param {string=} type Comparison type. One of: 'equal', 'gte', 'lte'. Default to 'equal'.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'len' or 'type' is invalid.
 */

//#example
import * as v from 'uvo';

v.length(3)([0, 1, 2]);
// => [0, 1, 2]

v.length(3, 'gte')([0, 1, 2]);
// => [0, 1, 2]

v.length(3, 'lte')([0, 1, 2]);
// => [0, 1, 2]

v.length.not(3, 'lte')([0, 1, 2]);
// => null

v.length(3)('abc');
// => 'abc'

v.length(3)({ length: 3 });
// => { length: 3 }

v.length(3)(10 as any);
// => null

v.length(3)({ length: '3' } as any); // length is not a number.
// => null

v.length.not(3)([0, 1, 2]);
// => null

v.length.not(3)('abc');
// => null

v.length.not(3)([0, 1, 2, 3]);
// => [0, 1, 2, 3]

v.length.not(3)('abcd');
// => 'abcd'