/**
 * @name {string}
 * 
 * @universal
 * 
 * @scheme {string<T>(error?: Error): Validator<T, string>}
 * 
 * @checkable
 * 
 * @desc Checks value to be a string compatible.
 * 
 * {@link docs/classic-api/type-validator-processor}
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 */

//#example
import * as v from 'uvo';

v.string()(1);
// => '1'

v.string()('1');
// => '1'

v.string()(true);
// => 'true'

v.string()([1, 2]);
// => null

v.string.check()(1);
// => 1

v.string.check()('1');
// => '1'

v.string.check()([1, 2]);
// => null