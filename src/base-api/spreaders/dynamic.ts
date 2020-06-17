import { S_DYN } from '@lib/base-api/names';
import { ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isFunction, toArray } from '@lib/base-api/utilities/types';
import { passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/dynamic}
 */
export const dynamic = <T>(preValidator: (value: T) => Validator<T> | Array<Validator<T>>): Validator<T> =>
  (
    isFunction(preValidator)
      ? (
        (value: T, onError?: ValidatorErrorCallback, meta?: MetaData): T => {
          const validators = preValidator(value);

          if (!validators) return value;

          return passValidators(value, onError, meta, toArray(validators));
        }
      )
      : throwValidatorError(S_DYN)
  );