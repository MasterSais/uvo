/**
 * @name {consecutive}
 * 
 * @template {<( ... )>}
 * 
 * @scheme {consecutive<T>(...validators: Array<Validator<any, T>>): Validator<any, T>}
 * 
 * @desc Groups validators sequentially.
 * Passes value through a sequence of validators until an error occurs.
 * Uses by default in 'object' and 'object2' validator's scheme for fields.
 * 
 * {@link docs/classic-api/type-grouper}
 * 
 * @param {...Processor} validators Validators list.
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'uvo';

const unchi = (
  v.consecutive(
    v.number(),
    v.gte(0)
  )
);

unchi(10);
// => 10

unchi(-1);
// => null

unchi('a');
// => null