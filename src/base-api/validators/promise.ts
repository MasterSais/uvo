import { V_ASYNC } from '@lib/base-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeAsync } from '@lib/base-api/utilities/factories';
import { isDefined, isPromise } from '@lib/base-api/utilities/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/promise}
 */
export const promise = <T>(error?: Error): Validator<Promise<T>, Promise<T>> =>
  (
    makeAsync(
      (value: Promise<T>, onError?: ErrorCallback, meta?: MetaData): Promise<T> =>
        (
          extendMeta(meta, value, V_ASYNC),

          isPromise(value)
            ? value.catch((inError: any): null => applyError(isDefined(error) ? error : inError, onError, meta))
            : Promise.resolve(value)
        )
    )
  );