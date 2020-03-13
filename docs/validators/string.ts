/**
 * @name {string<T>(error?: Error): Validator<T, string>}
 * 
 * @desc Checks value to be a string compatible.
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

v.string()(1);
// => '1'

v.string()('1');
// => '1'

v.string()(true);
// => 'true'

v.string()([1, 2]);
// => null

v.string.check()(1);
// => null

v.string.check()('1');
// => '1'