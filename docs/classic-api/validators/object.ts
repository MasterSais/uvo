/**
 * @name {object}
 * 
 * @template {@object(@o)}
 * 
 * @scheme {object<T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R>}
 * 
 * @desc Checks value to be an object.
 * 
 * {@link docs/classic-api/type-validator-processor}
 * 
 * @param {ObjectSpec=} spec Validators scheme for object.
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'spec' is invalid.
 */

//#example
import * as v from 'uvo';

const simpleObj = (
  v.object({ // is object?
    id: [v.number(), v.gte(0)], 
    name: [v.string(), v.minLen(10)],
    role: [v.string(), v.regex(/^[A-Z]{5,20}$/)]
  })
);

simpleObj({
  id: 3,
  name: 'YourAwesomeUserName',
  role: 'invalidRole', // wrong. Will be null
  status: 0 // will be skipped in output.
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }

simpleObj([]);
// => null

simpleObj(10 as any);
// => null

const fieldsKeeper = (
  v.object({
    id: [], // just takes input value.
    name: []
  })
);

fieldsKeeper({
  id: 3,
  name: 'YourAwesomeUserName',
  role: 'invalidRole',
  status: 0
});
// => { id: 3, name: 'YourAwesomeUserName' }