/**
 * @name {parallel}
 * 
 * @template {`<{ ... }>`}
 * 
 * @scheme {parallel<T>(...validators: Array<Validator<T>>): Validator<T>}
 * 
 * @desc Groups validators in parallel.
 * The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).
 * Beware of using processors inside.
 * 
 * {@link docs/classic-api/type-grouper}
 * 
 * @param {...Validator} validators Validators list.
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'uvo';

const unchi = (
  v.withErrors(
    v.parallel(
      v.lte(10, 'ERR1'),
      v.gte(0, 'ERR2'),
      v.integer('ERR3')
    )
  )
);

unchi(10);
// => { result: 10, errors: null }

unchi(-1);
// => { result: null, errors: ['ERR2'] }

unchi(11);
// => { result: null, errors: ['ERR1'] }

unchi(11.2);
// => { result: null, errors: ['ERR1', 'ERR3'] }