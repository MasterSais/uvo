import { V_LEN } from '../names';
import { Error, ErrorCallback, Lengthy, MetaData, Validator } from '../types';
import { applyError, isFiniteNumber, isObjectLike, isString, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/len}
 */
export const len = <T extends Lengthy>(len: number, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(len) && len >= 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && (isObjectLike(value) || isString(value))
            && isFiniteNumber(value.length)
            && value.length === len
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_LEN, [len]))
      )
      : throwValidatorError(V_LEN)
  );

/**
 * {@link docs/validators/len}
 */
export const ln = len;