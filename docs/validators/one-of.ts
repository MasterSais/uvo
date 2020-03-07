/**
 * @name {oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>}
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
import * as v from 'usov';

v.oneOf([0, 1, 2])(1);
// => 10

v.oneOf([0, 1, 2])(3);
// => null

v.oneOf([0, 1, [1]])([1]); // not a deep equality.
// => null