import { G_CONS } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isValidatorsSequence, reduceValidators, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/groupers/consecutive}
 */
export const consecutive = <T>(...validators: Array<Validator<any, T>>): Validator<any, T> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: any, onError?: ErrorCallback, meta?: MetaData): T =>
          reduceValidators(value, onError, meta, validators)
      )
      : throwValidatorError(G_CONS)
  );