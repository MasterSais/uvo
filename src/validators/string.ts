import { V_STR } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isDefined, isFunction, isObjectLike, makeCheckable, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/string}
 */
export const string = makeCheckable<(<T>(error?: Error) => Validator<T, string>), (<T>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, string> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): string =>
        (
          isDefined(value)
          && !isObjectLike(value)
          && !isFunction(value)
        )
          ? (checkOnly ? value as any : String(value)) : applyError(error, onError, setMetaValidator(meta, V_STR))
    )
);