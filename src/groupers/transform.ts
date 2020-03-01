import { ErrorCallback, MetaData, Processor } from '../types';

export const transform = <T, R>(...transformers: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
    transformers.reduce((value, processor) => processor(value, onError, meta), value) as R;