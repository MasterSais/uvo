/**
 * @name {even}
 * 
 * @scheme {even(error?: Error): Validator<number>}
 * 
 * @invertible
 * 
 * @shortcut {is(value => value % 2 === 0)}
 * 
 * @desc Checks number to be an even one.
 * 
 * {@link docs/type-validator}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
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