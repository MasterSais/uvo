/**
 * @name {erase}
 * 
 * @template {injected function via `$...`}
 * 
 * @scheme {erase<T>(): Validator<T, null>}
 * 
 * @desc Erase input.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.erase()(2);
// => null