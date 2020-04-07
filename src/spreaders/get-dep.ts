import { S_GDP } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { getFromMeta, isFunction, isString, isValidatorsSequence, reduceValidators, throwValidatorError, toArray } from '../utilities';

/**
 * {@link docs/classic-api/spreaders/get-dep}
 */
export const getDep = <T>(field: string, preValidator?: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T> =>
  (
    (isString(field) && field.length > 0)
      ? (
        isFunction(preValidator)
          ? (
            (value: T, onError?: ErrorCallback, meta?: MetaData): T => {
              const validators = preValidator(getFromMeta(field, meta));

              if (!validators) return value;

              const validatorsList = toArray(validators);

              return (
                (isValidatorsSequence(validatorsList) && meta)
                  ? reduceValidators(value, onError, meta, validatorsList)
                  : throwValidatorError(S_GDP)
              );
            }
          )
          : (
            (_value: T, _onError?: ErrorCallback, meta?: MetaData): T => (
              meta
                ? getFromMeta(field, meta)
                : throwValidatorError(S_GDP)
            )
          )
      )
      : throwValidatorError(S_GDP)
  );