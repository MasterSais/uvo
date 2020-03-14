import { C_FLB } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isFunction, isValidatorsSequence, reduceValidators, throwValidatorError } from '../utilities';

/**
 * {@link docs/containers/with-fallback}
 */
export const withFallback = <T, R>(fallback: R | ((initialValue: T, meta?: MetaData) => R), ...validators: Array<Validator<T | R, R>>): Validator<T | R, R> =>
  (
    (isValidatorsSequence(validators))
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R => {
          const result = reduceValidators(value, onError, meta, validators);

          return result !== null
            ? result
            : (
              isFunction(fallback)
                ? (fallback as Function)(value, meta)
                : fallback
            );
        }
      )
      : throwValidatorError(C_FLB)
  );