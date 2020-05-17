import { V_NUM } from '@lib/base-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isBoolean, isFinite, isNumber, isString } from '@lib/base-api/utilities/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/number}
 */
export const number = <T extends any>(error?: Error): Validator<T, number> =>
  (
    (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
      (
        extendMeta(meta, value, V_NUM),
        (
          isFinite(value) &&
          (
            isNumber(value)
            || isString(value) && ((value as string).trim() !== '')
            || isBoolean(value)
          )
        )
          ? +value
          : applyError(error, onError, meta)
      )
  );