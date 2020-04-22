import { G_PRLL } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isValidatorsSequence } from '@lib/classic-api/utilities/types';
import { throwValidatorError } from '@lib/classic-api/utilities/utilities';

/**
 * {@link docs/classic-api/groupers/parallel}
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
      : throwValidatorError(G_PRLL)
  );