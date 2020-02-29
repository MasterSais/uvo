import { ErrorCallback, MetaData, Validator } from '../types';
import { postToMeta } from '../utilities';

export const setDep = <T>(field: string): Validator<T> =>
  (value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
    postToMeta(value, field, meta);