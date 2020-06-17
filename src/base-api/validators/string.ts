import { V_STR } from '@lib/base-api/names';
import { ValidatorError, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isDefined, isFunction, isObjectLike } from '@lib/base-api/utilities/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/validators/string}
 */
export const string = <T>(error?: ValidatorError): Validator<T, string> =>
  (
    (value: T, onError?: ErrorCallback, meta?: MetaData): string =>
      (
        extendMeta(meta, value, V_STR),
        (
          isDefined(value)
          && !isObjectLike(value)
          && !isFunction(value)
        )
          ? value + ''
          : applyError(error, onError, meta)
      )
  );