import { V_NUM } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { applyError, extendMeta, isArray, isFinite, makeCheckable } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/number}
 */
export const number = makeCheckable<(<T>(error?: Error) => Validator<T, number>), (<T>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, number> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
        (
          extendMeta(meta, value, V_NUM),
          (
            value !== null
            && value as any !== String()
            && !isArray(value)
            && isFinite(value)
          )
            ? (
              checkOnly
                ? value as any
                : +value
            )
            : applyError(error, onError, meta)
        )
    )
);