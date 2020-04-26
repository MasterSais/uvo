/**
 * @name {lowercase}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {lowercase(): Validator<string, string>}
 * 
 * @desc Lowercase input string.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.lowercase()('ABC');
// => 'abc'