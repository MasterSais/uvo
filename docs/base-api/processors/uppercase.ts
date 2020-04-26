/**
 * @name {uppercase}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {uppercase(): Validator<string, string>}
 * 
 * @desc Uppercase input string.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.uppercase()('abc');
// => 'ABC'