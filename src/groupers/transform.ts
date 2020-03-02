import { G_TRM } from '../names';
import { Processor } from '../types';
import { isValidatorsSequence, throwValidatorError } from '../utilities';

/**
 * Groups processors sequentially.
 * Passes value through a sequence of processors.
 * Takes only processors (doesn't check errors).
 * 
 * Type: grouper. Groups processors into one.
 * 
 * @param {...Processor} processors Processors list.
 * @return {Processor} Function that takes value.
 * @throws {string} Will throw an error if 'processors' is invalid.
 */
export const transform = <T, R>(...processors: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (
    isValidatorsSequence(processors)
      ? (
        (value: T | R): R =>
          processors.reduce((value, processor) => processor(value), value) as R
      )
      : throwValidatorError(G_TRM)
  );