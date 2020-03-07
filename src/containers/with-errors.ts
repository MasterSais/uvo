import { C_ERR } from '../names';
import { Error, ErrorCallback, MetaData, Processor, Relevance, Result } from '../types';
import { isFunction, throwValidatorError } from '../utilities';

/**
 * Provides error handling mechanism.
 * 
 * Type: container. Embraces validator. Provides additional processing.
 * 
 * @param {Processor} validator Validator.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validator' is invalid.
 */
export const withErrors = <T, R>(validator: Processor<T, R>, commonErrorProcessor?: ((meta?: MetaData) => Error)): Processor<T, Result<R>> =>
  (
    isFunction(validator)
      ? (
        (value: T, _onError?: ErrorCallback, meta?: MetaData): Result<R> => {
          const errors: Array<{ error: any; relevance: Relevance }> = [];

          const addError = (error: any, relevance?: Relevance) =>
            errors.push({ error, relevance: relevance || { value: true } });

          const errorProcessor: ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) =>
            error && (
              isFunction(error)
                ? addError((error as Function)(meta), relevance)
                : addError(error, relevance)
            ) || commonErrorProcessor && addError(commonErrorProcessor(meta), relevance);

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