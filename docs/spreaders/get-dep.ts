/**
 * @name {getDep<T>(field: string, preValidator?: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T>}
 * 
 * @desc Takes value from spreaded structure.
 * Might be used for dynamic validators creation.
 * If 'preValidator' not provided, just replaces current value.
 * Works only with provided meta object.
 * 
 * {@link docs/type-spreader}
 * 
 * @param {string} field Spreaded value name.
 * @param {Function} preValidator Function that takes spreaded value and insert new validators into scheme.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'field' or 'meta' is invalid.
 */

//#example
import * as v from 'baridetta';

const simpleOne = (
  v.withMeta(
    v.object({
      pass: [v.string(), v.minLen(10), v.setDep('pass')],
      pass2: [v.getDep('pass', (pass: string) => v.equal(pass))] // Compares password and password confirmation
    })
  )
);

simpleOne({ pass: 'YourAwesomePassword', pass2: 'YourAwesomePassword' });
// => { pass: 'YourAwesomePassword', pass2: 'YourAwesomePassword' }

simpleOne({ pass: 'YourAwesomePassword', pass2: 'YourAwesomePass..' });
// => { pass: 'YourAwesomePassword', pass2: null }

simpleOne({ pass: 'Your...', pass2: 'YourAwesomePassword' });
// => { pass: null, pass2: null }