/**
 * @name {withMeta}
 * 
 * @scheme {withMeta<T, R>(validator: Validator<T, R>, onLogs?: (logs: Array<[string, any, Array<any>]>): Validator<T, R>}
 * 
 * @desc Provides meta structure. Can catch scheme logs.
 * 
 * {@link docs/classic-api/type-container}
 * 
 * @param {Validator} validator Validator.
 * 
 * @param {callback=} onLogs On Logs callback.
 * 
 * {@link docs/classic-api/validator-result}
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