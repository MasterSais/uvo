import { V_MNLEN } from '../names';
import { Error, ErrorCallback, Lengthy, MetaData, Validator } from '../types';
import { applyError, isFiniteNumber, isObjectLike, isString, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/min-len}
 */
export const minLen = <T extends Lengthy>(len: number, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(len) && len >= 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && (isObjectLike(value) || isString(value))
            && isFiniteNumber(value.length)
            && value.length >= len
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_MNLEN, [len]))
      )
      : throwValidatorError(V_MNLEN)
  );