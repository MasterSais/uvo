/**
 * @name {equal}
 * 
 * @template {`@compare(=...)` `@c(=...)` `@compare(!=...)` `@c(!=...)`}
 * 
 * @scheme {equal<T>(match: T | (() => T), error?: Error): Validator<T>}
 * 
 * @desc Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * @param {any} match Match. 
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */

//#example
import * as v from 'uvo';

v.equal(10)(10);
// => 10

v.equal('10')(10 as any);
// => null

v.equal([1, 2, 3])([1, 2, 3]); // it's not a deep equality. Only checks links.
// => null

v.equal.not(10)(10);
// => null

v.equal.not(10)(1);
// => 1