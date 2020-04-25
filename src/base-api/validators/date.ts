import { V_DTE } from '@lib/base-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeCheckable } from '@lib/base-api/utilities/factories';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/date}
 */
export const date = makeCheckable<(<T>(error?: Error) => Validator<T, number>), (<T>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, number> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
        (
          extendMeta(meta, value, V_DTE),
          (
            value !== null
            && !isNaN(new Date(value as any) as any)
          )
            ? (
              checkOnly
                ? value as any
                : new Date(value as any).getTime()
            )
            : applyError(error, onError, meta)
        )
    )
);