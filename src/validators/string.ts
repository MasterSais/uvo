import { V_STR } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, isFunction, isObjectLike, setMetaValidator } from '../utilities';

/**
 * Type: semi validator, semi processor. Checks value to be a string compatible.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const string = <T>(error?: Error): Processor<T, string> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): string =>
    (
      value !== undefined
      && !isObjectLike(value)
      && !isFunction(value)
    )
      ? String(value) : applyError(error, onError, setMetaValidator(meta, V_STR));