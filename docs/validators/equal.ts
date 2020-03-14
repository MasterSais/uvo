/**
 * @name {equal<T>(match: T, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.
 * Can be inverted with .not call.
 * 
 * {@link docs/type-validator}
 * 
 * @param {any} match Match. 
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'uvo';

v.equal(10)(10);
// => 10

v.equal('10')(10 as any);
// => null

v.equal([1, 2, 3])([1, 2, 3]); // it's not a deep equality. Only checks links.
// => null

v.equal.not(10)(10);
// => null

v.equal.not(10)(1);
// => 1