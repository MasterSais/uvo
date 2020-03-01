import { Error, ErrorCallback, MetaData, Processor, Relevance, Result } from '../types';
import { isFunction } from '../utilities';

export const withErrors = <T, R>(validator: Processor<T, R>, commonErrorProcessor?: ((meta?: MetaData) => Error)): Processor<T, Result<R>> =>
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
  };