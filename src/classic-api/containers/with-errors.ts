import { C_ERR } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, Relevance, Result, Validator } from '@lib/classic-api/types';
import { isFunction, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/containers/with-errors}
 */
export const withErrors = <T, R>(validator: Validator<T, R>, commonErrorProcessor?: ((error?: Error, meta?: MetaData) => Error)): Validator<T, Result<R>> =>
  (
    isFunction(validator)
      ? (
        (value: T, _onError?: ErrorCallback, meta?: MetaData): Result<R> => {
          const errors: Array<{ error: any; relevance: Relevance }> = [];

          const addError = (error?: any, relevance?: Relevance) =>
            error && errors.push({ error, relevance: relevance || { value: true } });

          const errorProcessor: ErrorCallback = (error?: Error, meta?: MetaData, relevance?: Relevance) =>
            commonErrorProcessor
              ? addError(commonErrorProcessor(
                isFunction(error)
                  ? (error as Function)(meta)
                  : error,
                meta
              ), relevance)
              : isFunction(error)
                ? addError((error as Function)(meta), relevance)
                : addError(error, relevance);

          const result = validator(value, errorProcessor, meta);

          const actualErrors = errors.filter(({ relevance }) => relevance.value);

          return {
            result,
            errors: actualErrors.length > 0
              ? actualErrors.map(({ error }) => error)
              : null
          };
        }
      )
      : throwValidatorError(C_ERR)
  );