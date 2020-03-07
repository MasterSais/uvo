/**
 * @name {consecutive<T>(...validators: Array<Processor<any, T> | Processor<any, T>>): Processor<any, T>}
 * 
 * @desc Groups validators sequentially.
 * Passes value through a sequence of validators until an error occurs.
 * Uses by default in 'object' validator's scheme for fields.
 * 
 * {@link docs/type-grouper}
 * 
 * @param {...Processor} validators Validators list.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'usov';

const uchi = (
  v.consecutive(
    v.number(),
    v.gte(0)
  )
);

uchi(10);
// => 10

uchi(-1);
// => null

uchi('a');
// => null