/**
 * @name {erase}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {erase<T>(): Validator<T, null>}
 * 
 * @desc Erase input.
 * 
 * {@link docs/classic-api/type-processor}
 * 
 * {@link docs/classic-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.erase()(2);
// => null