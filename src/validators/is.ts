import { V_IS } from '../names';
import { Error, ErrorCallback, Invertible, MetaData, Validator } from '../types';
import { applyError, invertCondition, invertError, isFunction, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/is}
 */
export const is = makeInvertible<(<T>(comparator: ((value: T) => boolean), error?: Error) => Validator<T>)>(
  (invert: boolean) => <T>(comparator: ((value: T) => boolean), error?: Error): Validator<T> =>
    (
      isFunction(comparator)
        ? (
          (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
            invertCondition(comparator(value), invert)
              ? value
              : applyError(error, onError, setMetaValidator(meta, invertError(V_IS, invert), [comparator.toString()]))
        )
        : throwValidatorError(invertError(V_IS, invert))
    )
);

/**
 * {@link docs/validators/defined}
 */
export const defined: <T>(error?: Error) => Validator<T, T> = <T>(error?: Error) => is((value: T) => value !== undefined, error);

/**
 * {@link docs/validators/equal}
 */
export const equal = (<T>(match: T, error?: Error) => is((value: T) => value === match, error)) as any as Invertible<<T>(match: T, error?: Error) => Validator<T, T>>;

equal.not = <T>(match: T, error?: Error) => is((value: T) => value !== match, error);

/**
 * {@link docs/validators/gte}
 */
export const gte = (<T>(bound: T, error?: Error) => is((value: T) => value >= bound, error)) as any as Invertible<<T>(bound: T, error?: Error) => Validator<T, T>>;

gte.not = <T>(bound: T, error?: Error) => is((value: T) => value < bound, error);

/**
 * {@link docs/validators/lte}
 */
export const lte = (<T>(bound: T, error?: Error) => is((value: T) => value <= bound, error)) as any as Invertible<<T>(bound: T, error?: Error) => Validator<T, T>>;

lte.not = <T>(bound: T, error?: Error) => is((value: T) => value > bound, error);