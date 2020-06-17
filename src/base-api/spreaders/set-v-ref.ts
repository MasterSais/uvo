import { S_SVDP } from '@lib/base-api/names';
import { ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isString, isValidatorsSequence } from '@lib/base-api/utilities/types';
import { passValidators, postToMeta, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/set-v-ref}
 */
export const setVRef = <T>(field: string, ...validators: Array<Validator<T>>): Validator<T> =>
  (
    (isString(field) && isValidatorsSequence(validators))
      ? (
        (value: T, onError?: ValidatorErrorCallback, meta?: MetaData): T =>
          meta
            ? (
              postToMeta(validators, field, meta),
              passValidators(value, onError, meta, validators)
            )
            : throwValidatorError(S_SVDP)
      )
      : throwValidatorError(S_SVDP)
  );