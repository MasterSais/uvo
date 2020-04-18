/**
 * @name {round}
 * 
 * @template {injected function via $...}
 * 
 * @scheme {round(method?: 'floor' | 'ceil'): Validator<number, number>}
 * 
 * @desc Round input number with specific method.
 * 
 * {@link docs/classic-api/type-processor}
 * 
 * @param {string=} method Specific method.
 * 
 * {@link docs/classic-api/processor-result}
 */

//#example
import * as v from 'uvo';

v.round()(10);
// => 10

v.round()(10.2);
// => 10

v.round()(9.8);
// => 10

v.round('floor')(10);
// => 10

v.round('floor')(10.2);
// => 10

v.round('floor')(9.8);
// => 9

v.round('ceil')(10);
// => 10

v.round('ceil')(10.2);
// => 11

v.round('ceil')(9.8);
// => 10