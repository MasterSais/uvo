/**
 * @name {integer(error?: Error): Validator<number>}
 * 
 * @desc Checks number to be an integer.
 * 
 * {@link docs/type-validator}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'usov';

v.integer()(1);
// => 1

v.integer()(1.1);
// => null

v.integer()('1' as any); // requires a number.
// => null