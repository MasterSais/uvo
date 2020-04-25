import { C_PRM } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Result, Validator } from '@lib/base-api/types';
import { isFunction } from '@lib/base-api/utilities/types';
import { onAsync, passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/containers/with-promise}
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