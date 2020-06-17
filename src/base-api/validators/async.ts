import { V_ASYNC } from '@lib/base-api/names';
import { ValidatorError, ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeAsync } from '@lib/base-api/utilities/factories';
import { callee, isPromise } from '@lib/base-api/utilities/types';
import { applyError, extendMeta, postAsyncToMeta } from '@lib/base-api/utilities/utilities';

const internalErrorProcessor = (_meta?: MetaData, internalError?: any) => internalError;

/**
 * {@link docs/base-api/validators/async}
 */
export const async = <T>(name?: string, error: ValidatorError = internalErrorProcessor): Validator<Promise<T>, Promise<T>> =>
  (
    error = callee(error),

    makeAsync(
      (value: Promise<T>, onError?: ValidatorErrorCallback, meta?: MetaData): Promise<T> =>
        (
          extendMeta(meta, value, V_ASYNC),

          isPromise(value)
            ? postAsyncToMeta(
              (
                value.catch(
                  (inError: any): null => applyError(
                    (meta?: MetaData) => (error as Function)(meta, inError), onError, meta
                  )
                )
              ),
              name,
              meta
            )
            : Promise.resolve(value)
        )
    )
  );