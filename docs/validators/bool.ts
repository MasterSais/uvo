/**
 * @name {bool}
 * 
 * @universal
 * 
 * @scheme {bool<T>(error?: Error): Validator<T, boolean>}
 * 
 * @checkable
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
import * as v from 'uvo';

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

v.bool.check()(true);
// => true

v.bool.check()(1);
// => 1

v.bool.check()('abc');
// => null