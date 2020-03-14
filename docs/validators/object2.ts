/**
 * @name {object2<T extends ObjectLike, R = T>(spec?: Array<[string | RegEx, ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R>}
 * 
 * @desc Checks value to be an object. Provides strict ordering.
 * Each key can be a Regex.
 * 
 * {@link docs/type-validator-processor}
 * 
 * @param {Array=} spec Validators scheme for object in form of array.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
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

const advancedObj = (
  v.object2([
    ['id', v.number(), v.gte(0)],
    [/name|surname|thirdname/, v.string(), v.minLen(10)] // use regex for fields matching.
  ])
);

advancedObj({
  id: 3,
  name: 'YourAwesomeUserName',
  surname: 'YourAwesomeUserSurname',
  thirdname: 'YourAwesomeUserThirdname'
});
// => { id: 3, name: 'YourAwesomeUserName', surname: 'YourAwesomeUserSurname', thirdname: 'YourAwesomeUserThirdname' }