/**
 * @name {integer}
 * 
 * @scheme {integer(error?: Error): Validator<number>}
 * 
 * @invertible
 * 
 * @shortcut {is(value => value % 1 === 0)}
 * 
 * @desc Checks number to be an integer.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
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