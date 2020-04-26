/**
 * @name {number}
 * 
 * @template {`@number` `@n`}
 * 
 * @scheme {number<T>(error?: Error): Validator<T, number>}
 * 
 * @desc Checks value to be a number compatible.
 * 
 * {@link docs/base-api/type-validator-processor}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
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