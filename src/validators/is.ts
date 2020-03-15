import { V_IS } from '../names';
import { Error, ErrorCallback, Invertible, MetaData, Validator } from '../types';
import { applyError, isFunction, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/is}
 */
export const is = <T>(comparator: ((value: T) => boolean), error?: Error): Validator<T> =>
  (
    isFunction(comparator)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          comparator(value)
            ? value
            : applyError(error, onError, setMetaValidator(meta, V_IS, [comparator.toString()]))
      )
      : throwValidatorError(V_IS)
  );

/**
 * {@link docs/validators/defined}
 */
export const defined = <T>(error?: Error) => is((value: T) => value !== undefined, error);

/**
 * {@link docs/validators/equal}
 */
export const equal: Invertible<(<T>(match: T, error?: Error) => Validator<T, T>)> = <T>(match: T, error?: Error) => is((value: T) => value === match, error);

equal.not = <T>(match: T, error?: Error) => is((value: T) => value !== match, error);

/**
 * {@link docs/validators/gte}
 */
export const gte: Invertible<(<T>(bound: T, error?: Error) => Validator<T, T>)> = <T>(bound: T, error?: Error) => is((value: T) => value >= bound, error);

gte.not = <T>(bound: T, error?: Error) => is((value: T) => value < bound, error);

/**
 * {@link docs/validators/lte}
 */
export const lte: Invertible<(<T>(bound: T, error?: Error) => Validator<T, T>)> = <T>(bound: T, error?: Error) => is((value: T) => value <= bound, error);

lte.not = <T>(bound: T, error?: Error) => is((value: T) => value > bound, error);