/**
 * @name {trim(method?: 'left' | 'right'): Validator<string, string>}
 * 
 * @desc Trim input string with specific method.
 * 
 * {@link docs/type-processor}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'baridetta';

v.trim()(' abc ');
// => 'abc'

v.trim('left')(' abc ');
// => 'abc '

v.trim('right')(' abc ');
// => ' abc'