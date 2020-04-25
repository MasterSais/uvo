/**
 * @name {useDefault}
 * 
 * @scheme {useDefault<T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>}
 * 
 * @desc Puts default value into spreaded structure.
 * If input value is empty, puts default value instead, otherwise validates input values with provided validators.
 * If you need fallback value on error use 'withFallback' container instead.
 * 
 * {@link docs/base-api/type-spreader}
 * 
 * @param {any} defaultValue Default value.
 * 
 * @param {...Processor} validators Validators for input value.
 * 
 * {@link docs/base-api/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'uvo';

const simpleOne = (
  v.useDefault('default', v.string(), v.minLen(10))
);

simpleOne(null);
// => 'default'

simpleOne('');
// => 'default'

simpleOne('Stringu'); // too short.
// => null

simpleOne('Stringuuuuuuuuuu');
// => 'Stringuuuuuuuuuu'