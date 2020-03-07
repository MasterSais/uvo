/**
 * @name {notEqual<T>(match: T, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be not equal to 'match' param. Requires the same type. Shallow comparison.
 * 
 * {@link docs/type-validator}
 * 
 * @param {any} match Match.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 */

//#example
import * as v from 'usov';

v.notEqual(10)(10);
// => null

v.notEqual('10')(10 as any);
// => 10

v.notEqual([1, 2, 3])([1, 2, 3]); // it's not a deep equality. Only checks links.
// => [1, 2, 3]