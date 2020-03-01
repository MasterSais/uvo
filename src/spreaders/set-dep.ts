import { ErrorCallback, MetaData, Validator } from '../types';
import { isDefined, postToMeta } from '../utilities';

export const setDep = <T>(field: string, extValue?: T): Validator<T> =>
  (value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
    postToMeta(isDefined(extValue) ? extValue : value, field, meta);