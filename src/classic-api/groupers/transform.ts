import { G_TRM } from '@lib/classic-api/names';
import { Validator } from '@lib/classic-api/types';
import { isValidatorsSequence } from '@lib/classic-api/utilities/types';
import { throwValidatorError } from '@lib/classic-api/utilities/utilities';

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