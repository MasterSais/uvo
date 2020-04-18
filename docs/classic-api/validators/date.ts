/**
 * @name {date}
 * 
 * @template {@date(@d)}
 * 
 * @scheme {date<T>(error?: Error): Validator<T, number>}
 * 
 * @desc Checks value to be a date compatible. Result in ms.
 * 
 * {@link docs/classic-api/type-validator-processor}
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
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