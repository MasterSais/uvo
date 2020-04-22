import { C_PRM } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Result, Validator } from '@lib/classic-api/types';
import { isFunction } from '@lib/classic-api/utilities/types';
import { onAsync, passValidators, throwValidatorError } from '@lib/classic-api/utilities/utilities';

/**
 * {@link docs/classic-api/containers/with-promise}
 */
export const withPromise = <T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Result<R>>> =>
  (
    isFunction(validator)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): Promise<R | Result<R>> =>
          new Promise(resolve =>
            onAsync(
              passValidators(value, onError, meta && { ...meta, _asyncStack: {} }, [validator]),
              resolve
            )
          )
      )
      : throwValidatorError(C_PRM)
  );