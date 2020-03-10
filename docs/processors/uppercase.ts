/**
 * @name {uppercase(): Validator<string, string>}
 * 
 * @desc Uppercase input string.
 * 
 * {@link docs/type-processor}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'baridetta';

v.uppercase()('abc');
// => 'ABC'