import { V_STR } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, isDefined, isFunction, isObjectLike, setMetaValidator } from '../utilities';

/**
 * Checks value to be a string compatible.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
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
 * @borrows str as string
 */
export const str = string;