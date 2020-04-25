import { S_SVDP } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isString, isValidatorsSequence } from '@lib/base-api/utilities/types';
import { passValidators, postToMeta, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/set-v-dep}
 */
export const setVDep = <T>(field: string, ...validators: Array<Validator<T>>): Validator<T> =>
  (
    (isString(field) && field.length > 0 && isValidatorsSequence(validators) && validators.length > 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          meta
            ? (
              postToMeta(validators, field, meta),
              passValidators(value, onError, meta, validators)
            )
            : throwValidatorError(S_SVDP)
      )
      : throwValidatorError(S_SVDP)
  );