import { C_PRM } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Result, Validator } from '@lib/classic-api/types';
import { isFunction, onAsync, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/containers/with-promise}
 */
export const withPromise = <T, R>(validator: Validator<T, R | Result<R>>): Validator<T, Promise<R | Result<R>>> =>
  (
    isFunction(validator)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): Promise<R | Result<R>> =>
          new Promise(
            (resolve, reject) => {
              const data = validator(value, onError, meta && { ...meta, _async: true });

              onAsync(data, (
                data => data.errors ? reject(data) : resolve(data)
              ));
            }
          )
      )
      : throwValidatorError(C_PRM)
  );