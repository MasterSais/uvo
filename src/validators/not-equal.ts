import { V_NEQ } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, setMetaValidator } from '../utilities';

/**
 * Type: validator. Checks value to be not equal to 'match' param. Requires the same type. Shallow comparison.
 * 
 * @param {any} match Match. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const notEqual = <T>(match: T, error?: Error): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (
      value !== match
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_NEQ, [match]));