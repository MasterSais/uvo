import { ErrorCallback, Processor } from '../types';

export const withMeta = <T, R>(validator: Processor<T, R>): Processor<T, R> =>
  (value: T, onError?: ErrorCallback): R =>
    validator(value, onError, { path: [], _deps: {}, params: [] });