/**
 * @name {defined}
 * 
 * @template {`@compare(=def)` `@c(=def)`}
 * 
 * @scheme {defined<T>(error?: Error): Validator<T>}
 * 
 * @desc Checks value to be defined.
 * 
 * {@link docs/classic-api/type-validator}
 * 
 * {@link docs/classic-api/error-param}
 * 
 * {@link docs/classic-api/validator-result}
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