/**
 * @name {regex<T extends unknown>(match: RegExp, error?: Error): Validator<T>}
 * 
 * @desc Checks value to match a pattern. Can be inverted with .not call.
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
import * as v from 'baridetta';

v.regex(/^[0-9]$/)(1);
// => 1

v.regex(/^[0-9]$/)(11);
// => null

v.regex.not(/^[0-9]$/)(1);
// => null

v.regex(/^[0-9]$/)(11);
// => 11