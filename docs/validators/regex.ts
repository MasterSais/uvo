/**
 * @name {regex}
 * 
 * @scheme {regex<T>(match: RegExp, error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @shortcut {is(value => match.test(value))}
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
import * as v from 'uvo';

v.regex(/^[0-9]$/)(1);
// => 1

v.regex(/^[0-9]$/)(11);
// => null

v.regex.not(/^[0-9]$/)(1);
// => null

v.regex(/^[0-9]$/)(11);
// => 11