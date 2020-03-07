import { G_TRM } from '../names';
import { Processor } from '../types';
import { isValidatorsSequence, throwValidatorError } from '../utilities';

/**
 * {@link docs/groupers/transform}
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