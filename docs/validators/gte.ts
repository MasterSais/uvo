/**
 * @name {gte}
 * 
 * @scheme {gte<T>(bound: T, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be greater or equal to 'match' param. Requires the same type.
 * 
 * @invertible
 * 
 * @shortcut {is(value => value >= bound)}
 * 
 * {@link docs/type-validator}
 * 
 * @param {Primitive | Date} bound Boundary value. Primitive or Date type.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'bound' is invalid.
 */

//#example
import * as v from 'uvo';

v.gte(0)(1);
// => 1

v.gte('0')('1');
// => '1'

v.gte(false)(true);
// => true

v.gte(0)(-1);
// => null

v.gte('b')('a');
// => null

v.gte(true)(false);
// => null

v.gte(new Date())(new Date(Date.now() + 1000));
// => Date

v.gte(new Date())(new Date(Date.now() - 1000));
// => null

v.gte.not(0)(1);
// => null

v.gte.not('0')('1');
// => null

v.gte.not(false)(true);
// => null

v.gte.not(0)(-1);
// => -1