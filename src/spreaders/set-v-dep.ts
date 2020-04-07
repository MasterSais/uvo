import { S_SVDP } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isString, isValidatorsSequence, postToMeta, reduceValidators, throwValidatorError } from '../utilities';

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
              reduceValidators(value, onError, meta, validators)
            )
            : throwValidatorError(S_SVDP)
      )
      : throwValidatorError(S_SVDP)
  );