import { S_DFT } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { callee, isEmpty, isValidatorsSequence } from '@lib/classic-api/utilities/types';
import { passValidators, throwValidatorError } from '@lib/classic-api/utilities/utilities';

/**
 * {@link docs/classic-api/spreaders/use-default}
 */
export const useDefault = <T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R> =>
  (
    (isValidatorsSequence(validators))
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
          !isEmpty(value)
            ? passValidators(value, onError, meta, validators)
            : callee(defaultValue)(meta)
      )
      : throwValidatorError(S_DFT)
  );