import { C_MET } from '@lib/base-api/names';
import { ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isFunction } from '@lib/base-api/utilities/types';
import { onAsync, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/containers/with-meta}
 */
export const withMeta = <T, R>(validator: Validator<T, R>, onLogs?: (logs: Array<[string, any, Array<any>]>, meta: MetaData) => void): Validator<T, R> =>
  (
    isFunction(validator)
      ? (
        (value: T, onError?: ValidatorErrorCallback): R => {
          const logs: Array<[string, any, Array<any>]> = [];

          const meta: MetaData = { path: [], _deps: {}, _logs: logs, params: [], _asyncStack: {} };

          const result = validator(value, onError, meta);

          return onAsync(result, (result: any) => {
            onLogs && onLogs(logs, meta);

            return result;
          });
        }
      )
      : throwValidatorError(C_MET)
  );