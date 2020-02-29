import { ErrorCallback, MetaData, Validator } from '../types';

export const consecutive = <T>(...validators: Array<Validator<T>>): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    validators.reduce((value: any, nextValidator: Validator<T>) =>
      (value !== null ? nextValidator(value, onError, meta) : null), value);