import { V_STR } from '@lib/base-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeCheckable } from '@lib/base-api/utilities/factories';
import { isDefined, isFunction, isObjectLike } from '@lib/base-api/utilities/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/string}
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