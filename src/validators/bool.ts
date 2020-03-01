import { V_BLN } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, setMetaValidator } from '../utilities';

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

/**
 * Checks value to be a boolean compatible.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const bool = <T>(error?: Error): Processor<T, boolean> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): boolean => {
    const index: number = (
      possibleValues.indexOf(value as any)
    );

    return (
      index >= 0
        ? Boolean(index % 2)
        : applyError(error, onError, setMetaValidator(meta, V_BLN))
    );
  };