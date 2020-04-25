/**
 * @name {or}
 * 
 * @template {`<[ ... ]>`}
 * 
 * @scheme {or<T>(...validators: Array<Validator<any, any>>): Validator<any, any>}
 * 
 * @desc Groups validators sequentially.
 * Searches for first successful validator's result.
 * 
 * {@link docs/base-api/type-grouper}
 * 
 * @param {...Processor} validators Validators list.
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'uvo';

const unchi = (
  v.or(
    v.number(),
    v.bool()
  )
);

unchi(10);
// => 10

unchi('true');
// => 'true'

unchi('abc');
// => null