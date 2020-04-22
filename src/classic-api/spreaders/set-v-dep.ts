import { S_SVDP } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isString, isValidatorsSequence } from '@lib/classic-api/utilities/types';
import { passValidators, postToMeta, throwValidatorError } from '@lib/classic-api/utilities/utilities';

/**
 * {@link docs/classic-api/spreaders/set-v-dep}
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