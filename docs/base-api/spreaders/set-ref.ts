/**
 * @name {setRef}
 * 
 * @template {`#...`}
 * 
 * @scheme {setRef<T>(field?: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T>}
 * 
 * @desc Puts value into spreaded structure.
 * If 'extValue' is provided, puts it instead of current value. i.e. reference api.
 * 
 * {@link docs/base-api/type-spreader}
 * 
 * @param {string} field Spreaded value name.
 * 
 * @param {any} extValue External value or function that returns it.
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'meta' is invalid.
 */

//#example
import * as v from 'uvo';

v.withMeta( // meta schema required for dependencies.
  v.object({
    id: [v.number(), v.gte(0), v.setRef('id')] // if 'id' is valid, sets 'id' dependency into schema.
  })
);

v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setRef()] // Sets into 'id' implicitly. Concats field's path.
  })
);

// without explicit field name
v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setRef()]
  })
);

v.withMeta(
  v.object({
    id: [v.number(), v.gte(0), v.setRef('isIdValid', true)] // custom data for dependency.
  })
);

v.withMeta(
  v.consecutive(
    v.setRef('beforeObjectValidation', true), // non conditional dependency.
    v.object({
      id: [v.number(), v.gte(0)]
    })
  )
);