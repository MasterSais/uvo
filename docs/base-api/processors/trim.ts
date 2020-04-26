/**
 * @name {trim}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {trim(method?: 'left' | 'right'): Validator<string, string>}
 * 
 * @desc Trim input string with specific method.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.trim()(' abc ');
// => 'abc'

v.trim('left')(' abc ');
// => 'abc '

v.trim('right')(' abc ');
// => ' abc'