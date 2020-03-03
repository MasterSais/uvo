import { S_SVDP } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isString, isValidatorsSequence, postToMeta, throwValidatorError } from '../utilities';

/**
 * Puts validators into spreaded structure.
 * Might be used for recursive schemes.
 * 
 * Type: spreader. Spreads data through a validators scheme.
 * 
 * @param {string} field Spreaded value name.
 * @param {..Validator} validators Validators to save.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'field' or 'validators' is invalid.
 */
export const setVDep = <T>(field: string, ...validators: Array<Validator<T>>): Validator<T> =>
  (
    (isString(field) && field.length > 0 && isValidatorsSequence(validators) && validators.length > 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            postToMeta(validators, field, meta),
            validators.reduce((value: any, nextValidator: Validator<T>) =>
              value !== null
                ? nextValidator(value, onError, meta)
                : null, value
            )
          )
      )
      : throwValidatorError(S_SVDP)
  );