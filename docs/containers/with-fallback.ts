/**
 * @name {withFallback}
 * 
 * @scheme {withFallback<T, R>(fallback: R | ((initialValue: T, meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>}
 * 
 * @desc Provides fallback value on error.
 * 
 * {@link docs/type-container}
 * 
 * @param {any} fallback Fallback value. Can be a function.
 * 
 * @param {...Processor} validators Validators for input value.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'uvo';

const simpleOne = (
  v.withFallback('fallback', v.string(), v.minLen(10))
);

simpleOne(null);
// => 'fallback'

simpleOne('');
// => 'fallback'

simpleOne('Stringu'); // too short.
// => 'fallback'

simpleOne('Stringuuuuuuuuuu');
// => 'Stringuuuuuuuuuu'