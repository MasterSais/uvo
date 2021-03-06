/**
 * @name {clamp}
 * 
 * @template {via `provide`}
 * 
 * @scheme {clamp<T>(min: T, max: T): Validator<T, T>}
 * 
 * @desc Clamps value to required boundaries.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * @param {Primitive} min Left bound to clamp to.
 * 
 * @param {Primitive} max Right bound to clamp to.
 * 
 * {@link docs/base-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.clamp(0, 5)(2);
// => 2

v.clamp(0, 5)(-2);
// => 0

v.clamp(0, 5)(7);
// => 5

v.clamp('c', 'e')('d');
// => 'd'

v.clamp('c', 'e')('a');
// => 'c'

v.clamp('c', 'e')('f');
// => 'e'