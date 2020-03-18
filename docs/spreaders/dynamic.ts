/**
 * @name {dynamic}
 * 
 * @scheme {dynamic<T>(preValidator: () => Validator<T> | Array<Validator<T>>): Validator<T>}
 * 
 * @desc Inserts new validators into scheme dynamically.
 * 
 * {@link docs/type-spreader}
 *
 * @param {Function} preValidator Function that inserts new validators into scheme dynamically.
 * 
 * {@link docs/validator-result}
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