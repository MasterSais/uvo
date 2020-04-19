/**
 * @name {uppercase}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {uppercase(): Validator<string, string>}
 * 
 * @desc Uppercase input string.
 * 
 * {@link docs/classic-api/type-processor}
 * 
 * {@link docs/classic-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.uppercase()('abc');
// => 'ABC'