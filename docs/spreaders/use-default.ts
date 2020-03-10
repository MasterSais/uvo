/**
 * @name {useDefault<T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R>}
 * 
 * @desc Puts default value into spreaded structure.
 * If input value is empty, puts default value instead, otherwise validates input values with provided validators.
 * 
 * {@link docs/type-spreader}
 * 
 * @param {any} defaultValue Default value.
 * @param {...Processor} validators Validators for input value.
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'validators' is invalid.
 */

//#example
import * as v from 'baridetta';

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