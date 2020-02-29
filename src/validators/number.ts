import { V_NUM } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, isArray, isFinite, setMetaValidator } from '../utilities';

/**
 * Type: semi validator, semi processor. Checks value to be a number compatible.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const number = <T extends unknown>(error?: Error): Processor<T, number> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
    (
      value !== null
      && value !== String()
      && !isArray(value)
      && isFinite(value)
    )
      ? Number(value) : applyError(error, onError, setMetaValidator(meta, V_NUM));