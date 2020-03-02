import { G_TRM } from '../names';
import { ErrorCallback, MetaData, Processor } from '../types';
import { isValidatorsSequence, throwValidatorError } from '../utilities';

/**
 * Groups processors sequentially.
 * Passes value through a sequence of processors.
 * Takes only processors (doesn't check errors).
 * 
 * Type: grouper. Groups processors into one.
 * 
 * @param {...Processor} processors Processors list.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'processors' is invalid.
 */
export const transform = <T, R>(...processors: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (
    isValidatorsSequence(processors)
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
          processors.reduce((value, processor) => processor(value, onError, meta), value) as R
      )
      : throwValidatorError(G_TRM)
  );