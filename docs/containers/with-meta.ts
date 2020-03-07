/**
 * @name {withMeta<T, R>(validator: Processor<T, R>): Processor<T, R>}
 * 
 * @desc Provides meta structure.
 * 
 * {@link docs/type-container}
 * 
 * @param {Processor} validator Validator.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'validator' is invalid.
 */

//#example
import * as v from 'usov';

const unchi = (
  v.withErrors(
    v.withMeta( // provides meta object into schema.
      v.parallel(
        v.lte(10, ({ validator }) => validator), // returns validator name as error.
        v.gte(0, ({ validator }) => validator),
        v.integer(({ validator }) => validator)
      )
    )
  )
);

unchi(10);
// => { result: 10, errors: null }

unchi(-1);
// => { result: null, errors: ['gte'] }

unchi(11);
// => { result: null, errors: ['lte'] }

unchi(11.2);
// => { result: null, errors: ['lte', 'integer'] }