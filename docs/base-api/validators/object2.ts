/**
 * @name {object2}
 * 
 * @template {`@object(...)` `@o(...)`}
 * 
 * @scheme {object2<T extends ObjectLike, R = T>(spec?: Array<[string | RegEx | Array<string> (() => string | RegExp | Array<string>), ...Array<Validator<any, any>>]>, error?: ValidatorError): Validator<T, R>}
 * 
 * @desc Checks value to be an object. Provides strict ordering.
 * Each key can be a Regex.
 * 
 * {@link docs/base-api/type-validator-processor}
 * 
 * @param {Array=} spec Validators scheme for object in form of array.
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'spec' is invalid.
 */

//#example
import * as v from 'uvo';

const simpleObj = (
  v.object2([ // is object?
    ['id', v.number(), v.gte(0)],
    ['name', v.string(), v.minLen(10)],
    ['role', v.string(), v.regex(/^[A-Z]{5,20}$/)]
  ])
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
  v.object2([
    ['id'], // just takes input value.
    ['name']
  ])
);

fieldsKeeper({
  id: 3,
  name: 'YourAwesomeUserName',
  role: 'invalidRole',
  status: 0
});
// => { id: 3, name: 'YourAwesomeUserName' }

v.object2([
  ['id', v.number(), v.gte(0)],
  [['name', 'surname', 'thirdname'], v.string(), v.minLen(10)] // Array of fields
]);

v.object2([
  ['id', v.number(), v.gte(0)],
  [/.*(name)/, v.string(), v.minLen(10)] // RegEx for fields
]);