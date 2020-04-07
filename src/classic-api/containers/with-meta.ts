import { C_MET } from '@lib/classic-api/names';
import { ErrorCallback, Validator } from '@lib/classic-api/types';
import { isFunction, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/containers/with-meta}
 */
export const withMeta = <T, R>(validator: Validator<T, R>, onLogs?: (logs: Array<[string, any, Array<any>]>) => void): Validator<T, R> =>
  (
    isFunction(validator)
      ? (
        (value: T, onError?: ErrorCallback): R => {
          const logs: Array<[string, any, Array<any>]> = [];

          const result = validator(value, onError, { path: [], _deps: {}, _logs: logs, params: [] });

          onLogs && onLogs(logs);

          return result;
        }
      )
      : throwValidatorError(C_MET)
  );