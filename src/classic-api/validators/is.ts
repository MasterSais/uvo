import { V_DEF, V_EM, V_EQ, V_GTE, V_IS, V_LTE, V_OOF, V_REG } from '@lib/classic-api/names';
import { Error, Validator } from '@lib/classic-api/types';
import { invertCondition, invertError, isArray, isDefined, isFactory, isOneType, isRegEx, isString, makeInvertible, throwValidatorError } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/is}
 */
export const is = isFactory(V_IS);

/**
 * {@link docs/classic-api/validators/defined}
 */
export const defined = (
  <T>(error?: Error) => isFactory(V_DEF)(
    (value: T) => isDefined(value), error
  )
);

const EMPTY_VALUES = [null, undefined, ''];

/**
 * {@link docs/classic-api/validators/empty}
 */
export const empty = makeInvertible<(<T>(error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(error?: Error) => isFactory(invertError(V_EM, invert), EMPTY_VALUES)(
        (value: T) => invertCondition(EMPTY_VALUES.indexOf(value as any) >= 0, invert), error
      )
    )
  )
);

/**
 * {@link docs/classic-api/validators/equal}
 */
export const equal = makeInvertible<(<T>(match: T, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(match: T, error?: Error) => isFactory(invertError(V_EQ, invert), [match])(
        (value: T) => invertCondition(value === match, invert), error
      )
    )
  )
);

/**
 * {@link docs/classic-api/validators/gte}
 */
export const gte = makeInvertible<(<T>(bound: T, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(bound: T, error?: Error) => isFactory(invertError(V_GTE, invert), [bound])(
        (value: T) => isOneType(bound, value) && (invert ? value < bound : value >= bound), error
      )
    )
  )
);

/**
 * {@link docs/classic-api/validators/lte}
 */
export const lte = makeInvertible<(<T>(bound: T, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(bound: T, error?: Error) => isFactory(invertError(V_LTE, invert), [bound])(
        (value: T) => isOneType(bound, value) && (invert ? value > bound : value <= bound), error
      )
    )
  )
);

/**
 * {@link docs/classic-api/validators/regex}
 */
export const regex = makeInvertible<(<T>(match: RegExp, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => <T>(match: RegExp, error?: Error): Validator<T> =>
      (
        isRegEx(match)
          ? (
            isFactory(invertError(V_REG, invert), [match])(
              (value: T) => invertCondition(match.test(value as any), invert), error
            )
          )
          : throwValidatorError(invertError(V_REG, invert))
      )
  )
);

/**
 * {@link docs/classic-api/validators/one-of}
 */
export const oneOf = makeInvertible<(<T>(candidates: Array<T> | string, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => <T>(candidates: Array<T> | string, error?: Error) => (
      (
        (isArray(candidates) || isString(candidates))
          ? (
            isFactory(invertError(V_OOF, invert), [candidates])(
              (value: T) => invertCondition(candidates.indexOf(value as any) >= 0, invert), error
            )
          )
          : throwValidatorError(V_OOF)
      )
    )
  )
);