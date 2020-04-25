import { S_SDP } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { callee, isDefined } from '@lib/base-api/utilities/types';
import { postToMeta, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/set-dep}
 */
export const setDep = <T>(field?: string, extValue?: any | ((value: T, meta?: MetaData) => any)): Validator<T> =>
  (
    (value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
      meta
        ? (
          postToMeta(
            isDefined(extValue)
              ? callee(extValue)(value, meta)
              : value,
            field || meta.path[meta.path.length - 1], meta
          ), value
        )
        : throwValidatorError(S_SDP)
  );