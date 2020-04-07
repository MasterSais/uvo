import { S_DYN } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isFunction, isValidatorsSequence, reduceValidators, throwValidatorError, toArray } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/spreaders/dynamic}
 */
export const dynamic = <T>(preValidator: () => Validator<T> | Array<Validator<T>>): Validator<T> =>
  (
    isFunction(preValidator)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T => {
          const validators = preValidator();

          if (!validators) return value;

          const validatorsList = toArray(validators);

          return (
            isValidatorsSequence(validatorsList)
              ? reduceValidators(value, onError, meta, validatorsList)
              : throwValidatorError(S_DYN)
          );
        }
      )
      : throwValidatorError(S_DYN)
  );