/**
 * @name {parallel<T>(...validators: Array<Validator<T>>): Validator<T>}
 * 
 * @desc Groups validators in parallel.
 * The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).
 * Beware of using processors inside.
 * 
 * {@link docs/type-grouper}
 * 
 * @param {...Validator} validators Validators list.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'usov';

const uchi = (
  v.withErrors(
    v.withMeta(
      v.parallel(
        v.lte(10, 'ERR1'),
        v.gte(0, 'ERR2'),
        v.integer('ERR3')
      )
    )
  )
);

uchi(10);
// => { result: 10, errors: null }

uchi(-1);
// => { result: null, errors: ['ERR2'] }

uchi(11);
// => { result: null, errors: ['ERR1'] }

uchi(11.2);
// => { result: null, errors: ['ERR1', 'ERR3'] }