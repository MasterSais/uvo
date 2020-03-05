import { V_EQ } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, setMetaValidator } from '../utilities';

/**
 * Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {any} match Match. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const equal = <T>(match: T, error?: Error): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (
      value === match
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_EQ, [match]));

/**
 * @borrows eq as equal
 */
export const eq = equal;