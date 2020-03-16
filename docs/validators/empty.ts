/**
 * @name {empty}
 * 
 * @scheme {empty<T>(error?: Error): Validator<T>}
 * 
 * @invertible
 * 
 * @shortcut {is(value => [null, undefined, ''].indexOf(value) >= 0)}
 * 
 * @desc Checks value to be empty.
 * 
 * {@link docs/type-validator}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
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