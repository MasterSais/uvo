/**
 * @name {string}
 * 
 * @template {`@string` `@s`}
 * 
 * @scheme {string<T>(error?: Error): Validator<T, string>}
 * 
 * @desc Checks value to be a string compatible. Converts on success. Use `string` from `Extended API` for check only.
 * 
 * {@link docs/base-api/type-validator-processor}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
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