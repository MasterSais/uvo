import { G_CONS } from '../names';
import { ErrorCallback, MetaData, Processor } from '../types';
import { isValidatorsSequence, throwValidatorError } from '../utilities';

/**
 * Groups validators sequentially.
 * Passes value through a sequence of validators until an error occurs.
 * Uses by default in 'object' validator's scheme for fields.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Processor} validators Validators list.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const consecutive = <T, R>(...validators: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
          validators.reduce((value: any, nextValidator: Processor<T | R, R>) =>
            (value !== null ? nextValidator(value, onError, meta) : null), value) as R
      )
      : throwValidatorError(G_CONS)
  );