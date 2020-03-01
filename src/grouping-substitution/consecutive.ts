import { G_CONS } from '@lib/names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isValidatorsSequence, validatorParamsError } from '../utilities';

/**
 * Groups validators sequentially.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Validator} validators Validators list.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const consecutive = <T>(...validators: Array<Validator<T>>): Validator<T> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          validators.reduce((value: any, nextValidator: Validator<T>) =>
            (value !== null ? nextValidator(value, onError, meta) : null), value)
      )
      : validatorParamsError(G_CONS)
  );