/**
 * @name {defined}
 * 
 * @scheme {defined<T>(error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @desc Checks value to be defined. Can be inverted with .not call.
 * 
 * {@link docs/type-validator}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
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

v.defined.not()(null);
// => null

v.defined.not()(undefined);
// => undefined

v.defined.not()('');
// => null

v.defined.not()(true);
// => null