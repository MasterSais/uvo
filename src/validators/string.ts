import { V_STR } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, extendMeta, isDefined, isFunction, isObjectLike, makeCheckable } from '../utilities';

/**
 * {@link docs/classic-api/validators/string}
 */
export const string = makeCheckable<(<T>(error?: Error) => Validator<T, string>), (<T>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, string> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): string =>
        (
          extendMeta(meta, value, V_STR),
          (
            isDefined(value)
            && !isObjectLike(value)
            && !isFunction(value)
          )
            ? (
              checkOnly
                ? value as any
                : String(value)
            )
            : applyError(error, onError, meta)
        )
    )
);