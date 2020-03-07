/**
 * @name {object<T extends ObjectLike, R extends ObjectLike>(spec?: ObjectRecords, error?: Error): Processor<T, R>}
 * 
 * @desc Checks value to be an object.
 * 
 * {@link docs/type-validator-processor}
 * 
 * @param {ObjectRecords=} spec Validators scheme for object.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/processor-result}
 * 
 * @throws {string} Will throw an error if 'spec' is invalid.
 */

//#example
import * as v from 'usov';

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
  role: 'invalidRole' // wrong. Will be null
});
// => { id: 3, name: 'YourAwesomeUserName', role: null }

simpleObj([]);
// => null

simpleObj(10 as any);
// => null