import { S_SDP } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { callee, isDefined, postToMeta, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/spreaders/set-dep}
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