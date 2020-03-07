/**
 * @name {clamp<T>(min: T, max: T): Processor<T, T>}
 * 
 * @desc Clamps value to required boundaries.
 * 
 * {@link docs/type-processor}
 * 
 * @param {number|string|boolean} min Left bound to clamp to.
 * @param {number|string|boolean} max Right bound to clamp to.
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'usov';

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