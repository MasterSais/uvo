import { ErrorCallback, MetaData, Validator } from '../types';
import { getFromMeta } from '../utilities';

export const mergeDep = <T>(field: string): Validator<T> =>
  (_value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
    getFromMeta(field, meta);