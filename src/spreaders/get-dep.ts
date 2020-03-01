import { ErrorCallback, MetaData, Validator } from '../types';
import { getFromMeta, toArray } from '../utilities';

export const getDep = <T>(field: string, preValidator: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    toArray(preValidator(getFromMeta(field, meta)))
      .reduce((value: any, nextValidator: Validator<T>) =>
        (value !== null ? nextValidator(value, onError, meta) : null), value);