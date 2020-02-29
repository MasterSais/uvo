import { Error, ErrorCallback, MetaData, Processor, Result } from '../types';

export const withPromise = <T, R>(validator: Processor<T, Result<R>>): Processor<T, Promise<R | Array<Error>>> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): Promise<R | Array<Error>> => new Promise((resolve, reject) => {
    const data = validator(value, onError, meta);

    data.errors ? reject(data.errors) : resolve(data.result || data as unknown as R);
  });