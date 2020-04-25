import { V_AWAIT } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeAsync } from '@lib/base-api/utilities/factories';
import { isString } from '@lib/base-api/utilities/types';
import { extendMeta, getAsyncFromMeta, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/wait}
 */
export const wait = <T>(name: string): Validator<T, Promise<T>> =>
  (
    isString(name)
      ? makeAsync(
        (value: T, _onError?: ErrorCallback, meta?: MetaData): Promise<T> =>
          (
            extendMeta(meta, value, V_AWAIT),

            getAsyncFromMeta(name, meta).then(() => value)
          )
      )
      : throwValidatorError(V_AWAIT)
  );