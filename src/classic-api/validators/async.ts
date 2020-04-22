import { V_ASYNC } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { makeAsync } from '@lib/classic-api/utilities/factories';
import { isDefined, isPromise, isString } from '@lib/classic-api/utilities/types';
import { applyError, extendMeta, postAsyncToMeta, throwValidatorError } from '@lib/classic-api/utilities/utilities';

/**
 * {@link docs/classic-api/validators/async}
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