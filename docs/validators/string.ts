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
 * {@link docs/type-validator-processor}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
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