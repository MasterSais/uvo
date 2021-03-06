/**
 * @name {number}
 * 
 * @template {`@number` `@n`}
 * 
 * @scheme {number<T>(error?: ValidatorError): Validator<T, number>}
 * 
 * @desc Checks value to be a number compatible. Converts on success. Use `number` from `Extended API` for check only.
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