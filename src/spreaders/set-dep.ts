import { S_SDP } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isDefined, isFunction, isString, postToMeta, throwValidatorError } from '../utilities';

/**
 * {@link docs/spreaders/set-dep}
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