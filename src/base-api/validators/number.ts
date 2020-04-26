import { V_NUM } from '@lib/base-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeCheckable } from '@lib/base-api/utilities/factories';
import { isArray, isFinite } from '@lib/base-api/utilities/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/number}
 */
export const number = makeCheckable<(<T>(error?: Error) => Validator<T, number>), (<T>(error?: Error) => Validator<T, number>)>(
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