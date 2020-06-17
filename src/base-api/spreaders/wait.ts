import { V_WAIT } from '@lib/base-api/names';
import { ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeAsync } from '@lib/base-api/utilities/factories';
import { isFiniteNumber, isString } from '@lib/base-api/utilities/types';
import { extendMeta, getAsyncFromMeta, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/wait}
 */
export const wait = <T>(name: string): Validator<T, Promise<T>> =>
  (
    (isString(name) || isFiniteNumber(name))
      ? makeAsync(
        (value: T, _onError?: ValidatorErrorCallback, meta?: MetaData): Promise<T> =>
          (
            extendMeta(meta, value, V_WAIT),

            getAsyncFromMeta(name, meta).then(() => value)
          )
      )
      : throwValidatorError(V_WAIT)
  );