/**
 * @name {number<T extends unknown>(error?: Error): Validator<T, number>}
 * 
 * @desc Checks value to be a number compatible.
 * Can be in CheckOnly mode with .check call.
 * 
 * {@link docs/type-validator-processor}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'baridetta';

v.number()(10);
// => 10

v.number()('10');
// => 10

v.number()(true);
// => 1

v.number()('true');
// => null

v.number()('12.1');
// => 12.1

v.number.check()(10);
// => 10

v.number.check()('10');
// => '10'

v.number.check()('true');
// => null