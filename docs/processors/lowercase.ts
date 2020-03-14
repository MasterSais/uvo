/**
 * @name {lowercase}
 * 
 * @scheme {lowercase(): Validator<string, string>}
 * 
 * @desc Lowercase input string.
 * 
 * {@link docs/type-processor}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'uvo';

v.lowercase()('ABC');
// => 'abc'