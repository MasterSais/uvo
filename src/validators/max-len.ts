import { V_MXLEN } from '../names';
import { Error, ErrorCallback, Lengthy, MetaData, Validator } from '../types';
import { applyError, isFiniteNumber, isObjectLike, isString, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/max-len}
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
      : throwValidatorError(V_MXLEN)
  );

/**
 * {@link docs/validators/max-len}
 */
export const mxl = maxLen;