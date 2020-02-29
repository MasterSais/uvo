import { ErrorCallback, MetaData, Processor } from '../types';

export const transform = <T, R>(...transformers: Array<Processor<T | R, T | R>>): Processor<T | R, T | R> =>
  (value: T | R, onError?: ErrorCallback, meta?: MetaData): T | R =>
    transformers.reduce((value, processor) => processor(value, onError, meta), value);