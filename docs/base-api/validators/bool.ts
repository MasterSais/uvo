/**
 * @name {bool}
 * 
 * @template {`@bool` `@b`}
 * 
 * @scheme {bool<T>(error?: ValidatorError): Validator<T, boolean>}
 * 
 * @desc Checks value to be a boolean compatible. Converts on success. Use `bool` from `Extended API` for check only.
 * 
 * {@link docs/base-api/type-validator-processor}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
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