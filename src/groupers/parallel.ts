import { G_PRLL } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isValidatorsSequence, validatorParamsError } from '../utilities';

/**
 * Groups validators in parallel.
 * The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).
 * Beware of using processors inside.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Validator} validators Validators list.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const parallel = <T>(...validators: Array<Validator<T>>): Validator<T> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          validators.reduce((validated: T, nextValidator: Validator<T>) =>
            (
              validated !== null
                ? nextValidator(value, onError, meta)
                : (nextValidator(value, onError, meta), null)
            ), value)
      )
      : validatorParamsError(G_PRLL)
  );