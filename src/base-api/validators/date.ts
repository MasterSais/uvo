import { V_DTE } from '@lib/base-api/names';
import { ValidatorError, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';
import { isDefined } from '../utilities/types';

/**
 * {@link docs/base-api/validators/date}
 */
export const date = <T>(error?: ValidatorError): Validator<T, number> =>
  (
    (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
      (
        extendMeta(meta, value, V_DTE),
        (
          value !== null
          && isDefined(value)
          && !isNaN(new Date(value as any) as any)
        )
          ? new Date(value as any).getTime()
          : applyError(error, onError, meta)
      )
  );