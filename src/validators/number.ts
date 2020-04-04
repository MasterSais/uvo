import { V_NUM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, extendMeta, isArray, isFinite, makeCheckable } from '../utilities';

/**
 * {@link docs/validators/number}
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