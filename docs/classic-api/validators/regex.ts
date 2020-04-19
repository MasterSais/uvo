/**
 * @name {regex}
 * 
 * @template {`@compare(*...)` `@c(*...)` `@compare(!*...)` `@c(!*...)`}
 * 
 * @scheme {regex<T>(match: RegExp | (() => RegExp), error?: Error): Validator<T>}
 * 
 * @desc Checks value to match a pattern.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * @param {RegExp} match Pattern.
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
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