import { V_LTE } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isBoolean, isFiniteNumber, isOneType, isString, setMetaValidator, throwValidatorError, valueOf } from '../utilities';

/**
 * {@link docs/validators/lte}
 */
export const lte = <T>(bound: T, error?: Error): Validator<T> =>
  (
    (bound = valueOf(bound), isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            isOneType(valueOf(value), bound)
            && value <= bound
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_LTE, [bound]))
      )
      : throwValidatorError(V_LTE)
  );