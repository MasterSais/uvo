/**
 * @name {notEmpty<T extends unknown>(error?: Error): Validator<T>}
 * 
 * @desc Checks value not to be empty.
 * 
 * {@link docs/type-validator}
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'baridetta';

v.notEmpty()(null);
// => null

v.notEmpty()(undefined);
// => null

v.notEmpty()('');
// => null

v.notEmpty()(true);
// => true

v.notEmpty()('abc');
// => 'abc'

v.notEmpty()(0);
// => 0