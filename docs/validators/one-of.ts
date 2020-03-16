/**
 * @name {oneOf}
 * 
 * @scheme {oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @shortcut {is(value => candidates.indexOf(value) >= 0)}
 * 
 * @desc Checks value to be one of expected. Shallow comparison.
 * 
 * {@link docs/type-validator}
 * 
 * @param {Array} candidates List of possible expected values.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'candidates' is invalid.
 */

//#example
import * as v from 'uvo';

v.oneOf([0, 1, 2])(1);
// => 1

v.oneOf([0, 1, 2])(3);
// => null

v.oneOf([0, 1, [1]])([1]); // not a deep equality.
// => null

v.oneOf.not([0, 1, 2])(1);
// => null

v.oneOf.not([0, 1, 2])(3);
// => 3