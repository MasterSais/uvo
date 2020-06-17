/**
 * @name {multiple}
 * 
 * @template {`@compare(%...)` `@c(%...)` `@compare(!%...)` `@c(!%...)`}
 * 
 * @scheme {multiple(multiplier: number | (() => number), error?: ValidatorError): Validator<number>}
 * 
 * @desc Checks number to be an integer.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'multiplier' is invalid.
 */

//#example
import * as v from 'uvo';

v.multiple(1)(1); // integer
// => 1

v.multiple(1)(1.1);
// => null

v.multiple(2)(2);
// => 2

v.multiple(2)(3);
// => null

v.multiple.not(3)(12);
// => null

v.multiple.not(3)(11);
// => 11