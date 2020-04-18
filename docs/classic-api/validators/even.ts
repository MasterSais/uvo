/**
 * @name {even}
 * 
 * @template {@compare(@c)}
 * 
 * @scheme {even(error?: Error): Validator<number>}
 * 
 * @desc Checks number to be an even one.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
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