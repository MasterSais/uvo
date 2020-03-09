/**
 * @name {lowercase(): Processor<string, string>}
 * 
 * @desc Lowercase input string.
 * 
 * {@link docs/type-processor}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'baridetta';

v.lowercase()('ABC');
// => 'abc'