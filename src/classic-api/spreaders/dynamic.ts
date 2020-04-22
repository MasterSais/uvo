import { S_DYN } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isFunction, toArray } from '@lib/classic-api/utilities/types';
import { passValidators, throwValidatorError } from '@lib/classic-api/utilities/utilities';

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

          return passValidators(value, onError, meta, toArray(validators));
        }
      )
      : throwValidatorError(S_DYN)
  );