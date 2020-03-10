/**
 * @name {bool<T>(error?: Error): Validator<T, boolean>}
 * 
 * @desc Checks value to be a boolean compatible.
 * 
 * {@link docs/type-validator-processor}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'baridetta';

v.bool()(true);
// => true

v.bool()(1);
// => true

v.bool()('false');
// => false

v.bool()('0');
// => false

v.bool()(10);
// => null

v.bool()('abc');
// => null