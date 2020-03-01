import { ErrorCallback, MetaData, Validator } from '../types';

export const parallel = <T>(...validators: Array<Validator<T>>): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    validators.reduce((validated: T, nextValidator: Validator<T>) =>
      (validated !== null ? nextValidator(validated, onError, meta) : (nextValidator(value, onError, meta), null)), value);