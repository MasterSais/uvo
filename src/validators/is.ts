import { V_IS, V_OOF, V_REG } from '../names';
import { Error, Validator } from '../types';
import { invertCondition, invertError, isArray, isFactory, isRegEx, makeInvertible, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/is}
 */
export const is = isFactory(V_IS);

/**
 * {@link docs/validators/defined}
 */
export const defined = (
  <T>(error?: Error) => isFactory(V_IS)(
    (value: T) => value !== undefined, error
  )
);

const EMPTY_VALUES = [null, undefined, ''];

/**
 * {@link docs/validators/empty}
 */
export const empty = makeInvertible<(<T>(error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(error?: Error) => isFactory(invertError(V_OOF, invert), [EMPTY_VALUES])(
        (value: T) => invertCondition(EMPTY_VALUES.indexOf(value as any) >= 0, invert), error
      )
    )
  )
);

/**
 * {@link docs/validators/equal}
 */
export const equal = makeInvertible<(<T>(match: T, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(match: T, error?: Error) => isFactory(invertError(V_IS, invert), [match])(
        (value: T) => invertCondition(value === match, invert), error
      )
    )
  )
);

/**
 * {@link docs/validators/gte}
 */
export const gte = makeInvertible<(<T>(bound: T, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(bound: T, error?: Error) => isFactory(invertError(V_IS, invert), [bound])(
        (value: T) => invertCondition(value >= bound, invert), error
      )
    )
  )
);

/**
 * {@link docs/validators/lte}
 */
export const lte = makeInvertible<(<T>(bound: T, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(bound: T, error?: Error) => isFactory(invertError(V_IS, invert), [bound])(
        (value: T) => invertCondition(value <= bound, invert), error
      )
    )
  )
);

/**
 * {@link docs/validators/regex}
 */
export const regex = makeInvertible<(<T>(match: RegExp, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => <T>(match: RegExp, error?: Error): Validator<T> =>
      (
        isRegEx(match)
          ? isFactory(invertError(V_REG, invert), [match])(
            (value: T) => invertCondition(match.test(value as any), invert), error
          )
          : throwValidatorError(invertError(V_REG, invert))
      )
  )
);

/**
 * {@link docs/validators/one-of}
 */
export const oneOf = makeInvertible<(<T>(candidates: Array<T>, error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => <T>(candidates: Array<T>, error?: Error) => (
      (
        isArray(candidates)
          ? isFactory(invertError(V_OOF, invert), [candidates])(
            (value: T) => invertCondition(candidates.indexOf(value) >= 0, invert), error
          )
          : throwValidatorError(V_OOF)
      )
    )
  )
);