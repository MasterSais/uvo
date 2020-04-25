/**
 * @name {dynamic}
 * 
 * @template {conditional validation via `?` or injection via `$...`}
 * 
 * @scheme {dynamic<T>(preValidator: (value: T) => Validator<T> | Array<Validator<T>>): Validator<T>}
 * 
 * @desc Inserts new validators into scheme dynamically.
 * 
 * {@link docs/base-api/type-spreader}
 *
 * @param {Function} preValidator Function that inserts new validators into scheme dynamically.
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'preValidator' is invalid.
 */

//#example
import * as v from 'uvo';

const validateNumbers = true; // external condition.

v.consecutive(
  v.number(),
  v.dynamic(() => validateNumbers && [ // validate on condition.
    v.gte(0),
    v.integer()
  ])
);

v.consecutive(
  v.date(),
  v.dynamic(() => [
    v.gte(Date.now()) // Compare with current date.
  ])
);