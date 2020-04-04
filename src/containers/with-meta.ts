import { C_MET } from '../names';
import { ErrorCallback, Validator } from '../types';
import { isFunction, throwValidatorError } from '../utilities';

/**
 * {@link docs/containers/with-meta}
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