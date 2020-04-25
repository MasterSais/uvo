/**
 * @name {even}
 * 
 * @template {`@compare(%2)` `@c(%2)` `@compare(!%2)` `@c(!%2)`}
 * 
 * @scheme {even(error?: Error): Validator<number>}
 * 
 * @desc Checks number to be an even one.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */

//#example
import * as v from 'uvo';

v.even()(1);
// => null

v.even()(2);
// => 2

v.even()(2.1);
// => null

v.even.not()(1);
// => 1

v.even.not()(2);
// => null