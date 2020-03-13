import { V_STR } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isDefined, isFunction, isObjectLike, isString, makeCheckable, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/string}
 */
export const string = makeCheckable<(<T>(error?: Error) => Validator<T, string>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, string> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): string =>
        (
          checkOnly
            ?
            (
              isString(value)
            )
            :
            (
              isDefined(value)
              && !isObjectLike(value)
              && !isFunction(value)
            )
        )
          ? String(value) : applyError(error, onError, setMetaValidator(meta, V_STR))
    )
);