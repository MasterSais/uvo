import { S_DFT } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isEmpty, isFunction, isValidatorsSequence, reduceValidators, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/spreaders/use-default}
 */
export const useDefault = <T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R> =>
  (
    (isValidatorsSequence(validators))
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
          !isEmpty(value)
            ? reduceValidators(value, onError, meta, validators)
            : (
              isFunction(defaultValue)
                ? (defaultValue as Function)(meta)
                : defaultValue
            )
      )
      : throwValidatorError(S_DFT)
  );