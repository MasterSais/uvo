import { S_GDP } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { getFromMeta, isFunction, isString, isValidatorsSequence, throwValidatorError, toArray } from '../utilities';

/**
 * Takes value from spreaded structure.
 * Might be used for dynamic validators creation.
 * 
 * Type: spreader. Spreads data through a validators scheme.
 * 
 * @param {string} field Validators list.
 * @param {Function} preValidator Function that takes spreaded value and insert new validators into scheme.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'field' or 'preValidator' is invalid.
 */
export const getDep = <T>(field: string, preValidator: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T> =>
  (
    (isString(field) && field.length > 0 && isFunction(preValidator))
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T => {
          const validators = preValidator(getFromMeta(field, meta));

          if (!validators) return value;

          const validatorsList = toArray(validators);

          return isValidatorsSequence(validatorsList)
            ? (
              validatorsList.reduce((value: any, nextValidator: Validator<T>) =>
                (value !== null ? nextValidator(value, onError, meta) : null), value)
            )
            : throwValidatorError(S_GDP);
        }
      )
      : throwValidatorError(S_GDP)
  );