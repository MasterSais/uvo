/**
 * @name {defined}
 * 
 * @template {`@compare(=def)` `@c(=def)`}
 * 
 * @scheme {defined<T>(error?: ValidatorError): Validator<T>}
 * 
 * @desc Checks value to be defined.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */

//#example
import * as v from 'uvo';

v.defined()(null);
// => null

v.defined()(undefined);
// => null

v.defined()('');
// => ''

v.defined()(true);
// => true