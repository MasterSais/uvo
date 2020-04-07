/**
 * @name {lowercase}
 * 
 * @scheme {lowercase(): Validator<string, string>}
 * 
 * @desc Lowercase input string.
 * 
 * {@link docs/classic-api/type-processor}
 * 
 * {@link docs/classic-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.lowercase()('ABC');
// => 'abc'