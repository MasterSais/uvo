import { V_GTE } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isBoolean, isFiniteNumber, isOneType, isString, setMetaValidator, validatorParamsError } from '../utilities';

/**
 * Checks value to be greater or equal to 'match' param. Requires the same type.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'bound' is invalid.
 */
export const gte = <T>(bound: T, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            isOneType(value, bound)
            && value >= bound
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_GTE, [bound]))
      )
      : validatorParamsError(V_GTE)
  );