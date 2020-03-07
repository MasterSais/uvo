import { V_STR } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, isDefined, isFunction, isObjectLike, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/string}
 */
export const string = <T>(error?: Error): Processor<T, string> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): string =>
    (
      isDefined(value)
      && !isObjectLike(value)
      && !isFunction(value)
    )
      ? String(value) : applyError(error, onError, setMetaValidator(meta, V_STR));

/**
 * {@link docs/validators/string}
 */
export const str = string;