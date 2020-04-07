/**
 * @name {number}
 * 
 * @universal
 * 
 * @scheme {number<T>(error?: Error): Validator<T, number>}
 * 
 * @checkable
 * 
 * @desc Checks value to be a number compatible.
 * 
 * {@link docs/classic-api/type-validator-processor}
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 */

//#example
import * as v from 'uvo';

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