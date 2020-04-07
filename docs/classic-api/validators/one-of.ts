/**
 * @name {oneOf}
 * 
 * @scheme {oneOf<T>(candidates: Array<T> | string, error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @shortcut {is(value => candidates.indexOf(value) >= 0)}
 * 
 * @desc Checks value to be one of expected. Shallow comparison.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * @param {Array} candidates List of possible expected values or string.
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'candidates' is invalid.
 */

//#example
import * as v from 'uvo';

v.oneOf([0, 1, 2])(1);
// => 1

v.oneOf('012')(1);
// => 1

v.oneOf([0, 1, 2])(3);
// => null

v.oneOf([0, 1, [1]])([1]); // not a deep equality.
// => null

v.oneOf.not([0, 1, 2])(1);
// => null

v.oneOf.not([0, 1, 2])(3);
// => 3

v.oneOf.not('abcdefg')('f');
// => null