/**
 * @name {empty}
 * 
 * @template {`@compare(=emp)` `@c(=emp)` `@compare(!=emp)` `@c(!=emp)`}
 * 
 * @scheme {empty<T>(error?: ValidatorError): Validator<T>}
 * 
 * @desc Checks value to be empty.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */

//#example
import * as v from 'uvo';

v.empty()(null);
// => null

v.empty()(undefined);
// => undefined

v.empty()('');
// => ''

v.empty()(true);
// => null

v.empty()('abc');
// => null

v.empty()(0);
// => null

v.empty.not()(undefined);
// => null

v.empty.not()(0);
// => 0