import { S_SDP } from '@lib/base-api/names';
import { ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { callee, isDefined, isString } from '@lib/base-api/utilities/types';
import { postToMeta, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/set-ref}
 */
export const setRef = <T>(field?: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T> =>
  (
    (value: T, _onError?: ValidatorErrorCallback, meta?: MetaData): T =>
      meta
        ? (
          postToMeta(
            isDefined(extValue)
              ? callee(extValue)(value, meta)
              : value,
            isString(field)
              ? field
              : meta.path.join('.'),
            meta
          ), value
        )
        : throwValidatorError(S_SDP)
  );