import { S_SDP } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isDefined, isFunction, isString, postToMeta, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/spreaders/set-dep}
 */
export const setDep = <T>(field: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T> =>
  (
    (isString(field) && field.length > 0)
      ? (
        (value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
          meta
            ? (
              postToMeta(
                isDefined(extValue)
                  ? (
                    isFunction(extValue)
                      ? (extValue as Function)(value, meta)
                      : extValue
                  )
                  : value,
                field, meta
              ), value
            )
            : throwValidatorError(S_SDP)
      )
      : throwValidatorError(S_SDP)
  );