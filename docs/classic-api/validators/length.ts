/**
 * @name {length}
 * 
 * @template {`@length(=...)` `@l(=...)` `@length(!=...)` `@l(!=...)`}
 * 
 * @scheme {length<T extends Lengthy>(len: number | (() => number), error?: Error): Validator<T>}
 * 
 * @desc Compares length with 'len' param. Requires to be an object like or string.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * @param {number} len Reference length. Positive finite number.
 *  * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'len' is invalid.
 */

//#example
import * as v from 'uvo';

v.length(3)([0, 1, 2]);
// => [0, 1, 2]

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