import { G_TRM } from '../names';
import { Validator } from '../types';
import { isValidatorsSequence, throwValidatorError } from '../utilities';

/**
 * {@link docs/classic-api/groupers/transform}
 */
export const transform = <T, R>(...processors: Array<Validator<T | R, R>>): Validator<T | R, R> =>
  (
    isValidatorsSequence(processors)
      ? (
        (value: T | R): R =>
          processors.reduce((value, processor) => processor(value), value) as R
      )
      : throwValidatorError(G_TRM)
  );