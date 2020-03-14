/**
 * @name {date}
 * 
 * @scheme {date<T>(error?: Error): Validator<T, number>}
 * 
 * @checkable
 * 
 * @desc Checks value to be a date compatible.
 * Can be in CheckOnly mode with .check call.
 * Result in ms.
 * 
 * {@link docs/type-validator-processor}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'uvo';

v.date()('12.12.2020');
// => 1607720400000

v.date()([12, 12, 2020]);
// => 1607720400000

v.date()('99.12.2020');
// => null

v.date.check()('12.12.2020');
// => '12.12.2020'

v.date.check()('99.12.2020');
// => null