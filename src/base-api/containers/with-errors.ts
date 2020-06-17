import { C_ERR } from '@lib/base-api/names';
import { ValidatorError, ValidatorErrorCallback, MetaData, Relevance, Result, Validator } from '@lib/base-api/types';
import { callee, isFunction } from '@lib/base-api/utilities/types';
import { onAsync, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/containers/with-errors}
 */
export const withErrors = <T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: ValidatorError, meta?: MetaData) => ValidatorError)): Validator<T, Result<R>> =>
  (
    isFunction(validator)
      ? (
        (value: T, _onError?: ValidatorErrorCallback, meta?: MetaData): Result<R> => {
          const errors: Array<{ error: any; relevance: Relevance }> = [];

          const addError = (error?: any, relevance?: Relevance) =>
            error && errors.push({ error, relevance: relevance || { value: true } });

          const errorProcessor: ValidatorErrorCallback = (error?: ValidatorError, meta?: MetaData, relevance?: Relevance) => (
            error = callee(error)(meta),

            addError(
              commonErrorProcessor
                ? commonErrorProcessor(error, meta)
                : error,
              relevance
            )
          );

          const result = validator(value, errorProcessor, meta);

          return onAsync(result, result => {
            const actualErrors = errors.filter(({ relevance }) => relevance.value);

            return ({
              result,
              errors: actualErrors.length > 0
                ? actualErrors.map(({ error }) => error)
                : null
            });
          });
        }
      )
      : throwValidatorError(C_ERR)
  );