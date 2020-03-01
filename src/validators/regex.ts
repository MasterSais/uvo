import { V_REG } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * Checks value to match a pattern.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {RegExp} match Pattern.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'match' is invalid.
 */
export const regex = <T extends unknown>(match: RegExp, error?: Error): Validator<T> =>
  (
    (match && match.constructor === RegExp)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            match.test(value as string)
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_REG, [match]))
      )
      : throwValidatorError(V_REG)
  );