import { S_DFT } from '../names';
import { ErrorCallback, MetaData, Processor } from '../types';
import { isEmpty, isFunction, isValidatorsSequence, reduceValidators, throwValidatorError } from '../utilities';

/**
 * Puts default value into spreaded structure.
 * If input value is empty, puts default value instead, otherwise validates input values with provided validators.
 * 
 * Type: spreader. Spreads data through a validators scheme.
 * 
 * @param {any} defaultValue Default value.
 * @param {...Processor} validators Validators for input value.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const useDefault = <T, R>(defaultValue: R | (() => R), ...validators: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (
    (isValidatorsSequence(validators))
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
          !isEmpty(value)
            ? reduceValidators(value, onError, meta, validators)
            : (
              isFunction(defaultValue)
                ? (defaultValue as Function)(meta)
                : defaultValue
            )
      )
      : throwValidatorError(S_DFT)
  );
  
/**
 * @borrows dft as useDefault
 */
export const dft = useDefault;