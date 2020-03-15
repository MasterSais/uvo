/**
 * @name {lte}
 * 
 * @scheme {lte<T>(bound: T, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be lower or equal to 'match' param. Requires the same type.
 * 
 * @invertible
 * 
 * @shortcut {is(value => value <= bound)}
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

v.lte(2)(1);
// => 1

v.lte('2')('1');
// => '1'

v.lte(true)(true);
// => true

v.lte(0)(1);
// => null

v.lte('a')('b');
// => null

v.lte(false)(true);
// => null

v.lte(new Date())(new Date(Date.now() - 1000));
// => Date

v.lte(new Date())(new Date(Date.now() + 1000));
// => null

v.lte.not(2)(1);
// => null

v.lte.not('2')('1');
// => null

v.lte.not(true)(true);
// => null

v.lte.not(0)(1);
// => 1