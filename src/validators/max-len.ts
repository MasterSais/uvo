import { V_MXLEN } from '../names';
import { Error, ErrorCallback, Lengthy, MetaData, Validator } from '../types';
import { applyError, isFiniteNumber, isObjectLike, isString, setMetaValidator, validatorParamsError } from '../utilities';

/**
 * Checks length to be equal to 'len' param. Requires to be object like.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export const maxLen = <T extends Lengthy>(len: number, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(len) && len >= 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && (isObjectLike(value) || isString(value))
            && isFiniteNumber(value.length)
            && value.length <= len
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_MXLEN, [len]))
      )
      : validatorParamsError(V_MXLEN)
  );