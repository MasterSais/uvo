import { V_AWAIT } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { makeAsync } from '@lib/classic-api/utilities/factories';
import { isString } from '@lib/classic-api/utilities/types';
import { extendMeta, getAsyncFromMeta, throwValidatorError } from '@lib/classic-api/utilities/utilities';

/**
 * {@link docs/classic-api/spreaders/wait}
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