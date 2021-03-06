import { V_NUM } from '@lib/base-api/names';
import { ValidatorError, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isArray, isFiniteAny } from '@lib/base-api/utilities/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/number}
 */
export const number = <T>(error?: ValidatorError): Validator<T, number> =>
  (
    (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
      (
        extendMeta(meta, value, V_NUM),
        (
          value !== null
          && value as any !== String()
          && !isArray(value)
          && isFiniteAny(value)
        )
          ? +value
          : applyError(error, onError, meta)
      )
  );