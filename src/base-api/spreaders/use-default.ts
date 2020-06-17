import { S_DFT } from '@lib/base-api/names';
import { ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { callee, isEmpty, isValidatorsSequence } from '@lib/base-api/utilities/types';
import { passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/use-default}
 */
export const useDefault = <T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R> =>
  (
    (isValidatorsSequence(validators))
      ? (
        (value: T | R, onError?: ValidatorErrorCallback, meta?: MetaData): R =>
          !isEmpty(value)
            ? passValidators(value, onError, meta, validators)
            : callee(defaultValue)(meta)
      )
      : throwValidatorError(S_DFT)
  );