import { V_ASYNC } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeAsync } from '@lib/base-api/utilities/factories';
import { isDefined, isPromise, isString } from '@lib/base-api/utilities/types';
import { applyError, extendMeta, postAsyncToMeta, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/async}
 */
export const async = <T>(name: string, error?: Error): Validator<Promise<T>, Promise<T>> =>
  (
    isString(name)
      ? makeAsync(
        (value: Promise<T>, onError?: ErrorCallback, meta?: MetaData): Promise<T> =>
          (
            extendMeta(meta, value, V_ASYNC),

            isPromise(value)
              ? postAsyncToMeta(
                (
                  value.catch((inError: any): null => applyError(isDefined(error) ? error : inError, onError, meta))
                ),
                name,
                meta
              )
              : Promise.resolve(value)
          )
      )
      : throwValidatorError(V_ASYNC)
  );