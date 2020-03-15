/**
 * @name {defined}
 * 
 * @scheme {defined<T>(error?: Error): Validator<T>}
 *
 * @shortcut {is(value => value !== undefined)}
 * 
 * @desc Checks value to be defined.
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