/**
 * @name {round(): Processor<number, number>}
 * 
 * @desc Round input number.
 * 
 * {@link docs/type-processor}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'usov';

v.round()(10);
// => 10

v.round()(10.2);
// => 10

v.round()(9.8);
// => 10