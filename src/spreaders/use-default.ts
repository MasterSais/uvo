import { S_DFT } from '../names';
import { ErrorCallback, MetaData, Processor } from '../types';
import { isEmpty, isFunction, isValidatorsSequence, reduceValidators, throwValidatorError } from '../utilities';

/**
 * {@link docs/spreaders/use-default}
 */
export const useDefault = <T, R>(defaultValue: R | ((meta?: MetaData) => R), ...validators: Array<Processor<T | R, R>>): Processor<T | R, R> =>
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