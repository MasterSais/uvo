/**
 * @name {random(min: number, max: number, precision: number): Validator<any, number>}
 * 
 * @desc Returns random value according to params.
 * 
 * {@link docs/type-processor}
 * 
 * @param {number=} min Min value. Default is 0.
 * @param {number=} max Max value. Default is 1.
 * @param {number=} precision Result precision. Default is 10.
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'baridetta';

v.random()(null);
// => in [0...1]

v.random(5, 10)(null);
// => in [5...10]

v.random(5, 10, 0)(null);
// => in [5, 6, 7, 8, 9, 10]

v.random(0, 1, 0)(null);
// => in [0, 1]