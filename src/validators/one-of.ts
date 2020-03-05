import { V_OOF } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isArray, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * Checks value to be one of expected. Shallow comparison.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {Array} candidates List of possible expected values. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'candidates' is invalid.
 */
export const oneOf = <T>(candidates: Array<T>, error?: Error): Validator<T> =>
  (
    isArray(candidates)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && candidates.indexOf(value) >= 0
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_OOF, [candidates]))
      )
      : throwValidatorError(V_OOF)
  );

/**
 * @borrows oof as oneOf
 */
export const oof = oneOf;