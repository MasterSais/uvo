import { V_DTE } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { applyError, extendMeta, makeCheckable } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/date}
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