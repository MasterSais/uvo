import { V_GTE } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isBoolean, isFiniteNumber, isOneType, isString, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/gte}
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
      : throwValidatorError(V_GTE)
  );