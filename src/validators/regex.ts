import { V_REG } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, setMetaValidator, validatorParamsError } from '../utilities';

const isRegEx = (value: any) => value && value.constructor === RegExp;

/**
 * Type: validator. Checks value to match a pattern.
 * 
 * @param {RegExp} match Pattern.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'match' is invalid.
 */
export const regex = <T extends unknown>(match: RegExp, error?: Error): Validator<T> =>
  (
    isRegEx(match)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            match.test(value as string)
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_REG, [match]))
      )
      : validatorParamsError(V_REG)
  );