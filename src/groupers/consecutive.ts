import { G_CONS } from '../names';
import { ErrorCallback, MetaData, Processor } from '../types';
import { isValidatorsSequence, reduceValidators, throwValidatorError } from '../utilities';

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
export const consecutive = <T>(...validators: Array<Processor<any, T> | Processor<any, T>>): Processor<any, T> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: any, onError?: ErrorCallback, meta?: MetaData): T =>
          reduceValidators(value, onError, meta, validators)
      )
      : throwValidatorError(G_CONS)
  );