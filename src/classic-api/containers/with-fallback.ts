import { C_FLB } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { callee, isValidatorsSequence } from '@lib/classic-api/utilities/types';
import { onAsync, passValidators, throwValidatorError } from '@lib/classic-api/utilities/utilities';

/**
 * {@link docs/classic-api/containers/with-fallback}
 */
export const withFallback = <T, R>(fallback: R | ((initialValue: T, meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R> =>
  (
    (isValidatorsSequence(validators))
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R => {
          const result = passValidators(value, onError, meta, validators);

          return (
            onAsync(result, data => (
              data !== null
                ? data
                : callee(fallback)(value, meta)
            ))
          );
        }
      )
      : throwValidatorError(C_FLB)
  );