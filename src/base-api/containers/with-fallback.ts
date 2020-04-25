import { C_FLB } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { callee, isValidatorsSequence } from '@lib/base-api/utilities/types';
import { onAsync, passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/containers/with-fallback}
 */
export const withFallback = <T, R>(fallback: R | ((initialValue: T, meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R> =>
  (
    isValidatorsSequence(validators)
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