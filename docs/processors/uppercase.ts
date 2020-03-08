/**
 * @name {uppercase(): Processor<string, string>}
 * 
 * @desc Uppercase input string.
 * 
 * {@link docs/type-processor}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'barideta';

v.uppercase()('abc');
// => 'ABC'