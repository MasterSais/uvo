/**
 * @name {number<T extends unknown>(error?: Error): Processor<T, number>}
 * 
 * @desc Checks value to be a number compatible.
 * 
 * {@link docs/type-validator-processor}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/processor-result}
 */

//#example
import * as v from 'usov';

v.number()(10);
// => 10

v.number()('10');
// => 10

v.number()(true);
// => 1

v.number()('true');
// => null

v.number()('12.1');
// => 12.1