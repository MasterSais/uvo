import { V_INT } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isNumber, setMetaValidator } from '../utilities';

/**
 * Type: validator. Checks number to be an integer.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const integer = (error?: Error): Validator<number> =>
  (value: number, onError?: ErrorCallback, meta?: MetaData): number =>
    (
      isNumber(value)
      && value % 1 === 0
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_INT));