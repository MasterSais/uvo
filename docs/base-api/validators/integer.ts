/**
 * @name {integer}
 * 
 * @template {`@compare(%1)` `@c(%1)` `@compare(!%1)` `@c(!%1)`}
 * 
 * @scheme {integer(error?: Error): Validator<number>}
 * 
 * @desc Checks number to be an integer.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */

//#example
import * as v from 'uvo';

v.integer()(1);
// => 1

v.integer()(1.1);
// => null

v.integer()('1' as any); // requires a number.
// => null

v.integer.not()(1);
// => null

v.integer.not()(1.1);
// => 1.1