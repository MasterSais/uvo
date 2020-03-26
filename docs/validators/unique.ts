/**
 * @name {unique}
 * 
 * @universal
 * 
 * @scheme {array<T>(field?: string | number | ((value: T) => any), error?: Error): Validator<Array<T>>}
 * 
 * @desc Checks array's elements to be unique.
 * 
 * {@link docs/type-validator}
 * 
 * @param {string | number} field Field name in case of objectlike elements or function. 
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'uvo';

const objValidator = (
  v.withMeta(
    v.withErrors(
      v.consecutive(
        v.array(v.object2()),
        v.unique('id', (meta: MetaData) => meta.path.join('.'))
      )
    )
  )
);

objValidator([{ id: 1 }, { id: 2 }, { id: 3 }]);
// => { result: [{ id: 1 }, { id: 2 }, { id: 3 }], errors: null }

objValidator([{ id: 1 }, { id: 2 }, { id: 1 }]);
// => { result: [{ id: 1 }, { id: 2 }, null], errors: ['2.id'] }

objValidator([{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }]);
// => { result: [{ id: 1 }, { id: 2 }, null, null], errors: ['2.id', '3.id'] }

const validator = (
  v.withMeta(
    v.withErrors(
      v.consecutive(
        v.array(v.number()),
        v.unique(null, (meta: MetaData) => meta.path.join('.'))
      )
    )
  )
);

validator([1, 2, 3]);
// => { result: [1, 2, 3], errors: null }

validator([{ id: 1 }, { id: 2 }, { id: 1 }]);
// => { result: [1, 2, null], errors: ['2'] }

validator([1, 2, 1, 2]);
// => { result: [1, 2, null, null], errors: ['2', '3'] }