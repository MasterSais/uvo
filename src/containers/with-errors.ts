import { C_ERR } from '../names';
import { Error, ErrorCallback, MetaData, Validator, Relevance, Result } from '../types';
import { isFunction, throwValidatorError } from '../utilities';

/**
 * {@link docs/containers/with-errors}
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

          return {
            result,
            errors: errors.length > 0
              ? errors.filter(({ relevance }) => relevance.value).map(({ error }) => error)
              : null
          };
        }
      )
      : throwValidatorError(C_ERR)
  );