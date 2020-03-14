/**
 * @name {withMeta}
 * 
 * @scheme {withMeta<T, R>(validator: Validator<T, R>): Validator<T, R>}
 * 
 * @desc Provides meta structure.
 * 
 * {@link docs/type-container}
 * 
 * @param {Validator} validator Validator.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'validator' is invalid.
 */

//#example
import * as v from 'uvo';

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