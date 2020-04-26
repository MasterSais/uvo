import { G_TRM } from '@lib/base-api/names';
import { Validator } from '@lib/base-api/types';
import { isValidatorsSequence } from '@lib/base-api/utilities/types';
import { throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/groupers/transform}
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