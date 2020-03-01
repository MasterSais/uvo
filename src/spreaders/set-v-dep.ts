import { ErrorCallback, MetaData, Validator } from '../types';
import { postToMeta } from '../utilities';

export const setVDep = <T>(field: string, ...validators: Array<Validator<T>>): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (postToMeta(validators, field, meta), validators.reduce((value: any, nextValidator: Validator<T>) =>
      (value !== null ? nextValidator(value, onError, meta) : null), value));