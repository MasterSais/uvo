/**
 * @name {setDep}
 * 
 * @scheme {setDep<T>(field: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>}
 * 
 * @desc Puts value into spreaded structure.
 * If 'extValue' is provided, puts it instead of current value. i.e. reference api.
 * 
 * {@link docs/classic-api/type-spreader}
 * 
 * @param {string} field Spreaded value name.
 * 
 * @param {any} extValue External value or function that returns it.
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'field' or 'meta' is invalid.
 */

//#example
import * as v from 'uvo';

v.withMeta( // meta schema required for dependencies.
  v.object({
    id: [v.number(), v.gte(0), v.setDep('id')] // if 'id' is valid, sets 'id' dependency into schema.
  })
);

v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setDep('isIdValid', true)] // custom data for dependency.
  })
);

v.withMeta(
  v.consecutive(
    v.setDep('beforeObjectValidation', true), // non conditional dependency.
    v.object({
      id: [v.number(), v.gte(0)]
    })
  )
);