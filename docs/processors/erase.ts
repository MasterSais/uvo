/**
 * @name {erase}
 * 
 * @scheme {erase<T>(): Validator<T, null>}
 * 
 * @desc Erase input.
 * 
 * {@link docs/type-processor}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'uvo';

v.erase()(2);
// => null