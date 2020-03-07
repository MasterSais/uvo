/**
 * @name {string<T>(error?: Error): Processor<T, string>}
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
import * as v from 'usov';

v.string()(1);
// => '1'

v.string()('1');
// => '1'

v.string()(true);
// => 'true'

v.string()([1, 2]);
// => null