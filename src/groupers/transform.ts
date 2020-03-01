import { ErrorCallback, MetaData, Processor } from '../types';

export const transform = <T, R>(...processors: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
    processors.reduce((value, processor) => processor(value, onError, meta), value) as R;