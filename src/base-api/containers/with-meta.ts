import { C_MET } from '@lib/base-api/names';
import { ErrorCallback, Validator } from '@lib/base-api/types';
import { isFunction } from '@lib/base-api/utilities/types';
import { onAsync, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/containers/with-meta}
 */
export const withMeta = <T, R>(validator: Validator<T, R>, onLogs?: (logs: Array<[string, any, Array<any>]>) => void): Validator<T, R> =>
  (
    isFunction(validator)
      ? (
        (value: T, onError?: ErrorCallback): R => {
          const logs: Array<[string, any, Array<any>]> = [];

          const result = validator(value, onError, { path: [], _deps: {}, _logs: logs, params: [], _asyncStack: {} });

          return onAsync(result, (result: any) => {
            onLogs && onLogs(logs);

            return result;
          });
        }
      )
      : throwValidatorError(C_MET)
  );