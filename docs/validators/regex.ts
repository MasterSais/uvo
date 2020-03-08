/**
 * @name {regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>}
 * 
 * @desc Checks value to match a pattern.
 * 
 * {@link docs/type-validator}
 * 
 * @param {RegExp} match Pattern.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'match' is invalid.
 */

//#example
import * as v from 'barideta';

v.regex(/[0-9]/)(1);
// => 1

v.regex(/[0-9]/)(11);
// => null