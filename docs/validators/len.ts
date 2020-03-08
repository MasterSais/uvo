/**
 * @name {len<T extends Lengthy>(len: number, error?: Error): Validator<T>}
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
import * as v from 'barideta';

v.len(3)([0, 1, 2]);
// => [0, 1, 2]

v.len(3)('abc');
// => 'abc'

v.len(3)({ length: 3 });
// => { length: 3 }

v.len(3)(10 as any);
// => null

v.len(3)({ length: '3' } as any);
// => null