import { V_DEF, V_EM, V_EQ, V_GTE, V_IS, V_LTE, V_OOF, V_REG } from '@lib/classic-api/names';
import { Error, Validator } from '@lib/classic-api/types';
import { invertCondition, invertError, isFactory, makeInvertible } from '@lib/classic-api/utilities/factories';
import { hasIndex, isDefined, isOneType } from '@lib/classic-api/utilities/types';

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
export const equal = makeInvertible<(<T>(match: T | (() => T), error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(match: T | (() => T), error?: Error) => isFactory(invertError(V_EQ, invert), match)(
        (value: T, param: T) => invertCondition(value === param, invert), error
      )
    )
  )
);

/**
 * {@link docs/classic-api/validators/gte}
 */
export const gte = makeInvertible<(<T>(bound: T | (() => T), error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(bound: T | (() => T), error?: Error) => (
        isFactory(invertError(V_GTE, invert), bound)(
          (value: T, param: T) => isOneType(param, value) && (invert ? value < param : value >= param), error
        )
      )
    )
  )
);

/**
 * {@link docs/classic-api/validators/lte}
 */
export const lte = makeInvertible<(<T>(bound: T | (() => T), error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => (
      <T>(bound: T | (() => T), error?: Error) => isFactory(invertError(V_LTE, invert), bound)(
        (value: T, param: T) => isOneType(param, value) && (invert ? value > param : value <= param), error
      )
    )
  )
);

/**
 * {@link docs/classic-api/validators/regex}
 */
export const regex = makeInvertible<(<T>(match: RegExp | (() => RegExp), error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => <T>(match: RegExp | (() => RegExp), error?: Error): Validator<T> =>
      (
        isFactory(invertError(V_REG, invert), match)(
          (value: T, param: RegExp) => invertCondition(param.test(value as any), invert), error
        )
      )
  )
);

/**
 * {@link docs/classic-api/validators/one-of}
 */
export const oneOf = makeInvertible<(<T>(candidates: Array<T> | string | (() => Array<T> | string), error?: Error) => Validator<T>)>(
  (
    (invert: boolean) => <T>(candidates: Array<T> | string | (() => Array<T> | string), error?: Error) => (
      (
        isFactory(invertError(V_OOF, invert), candidates)(
          (value: T, param: Array<any>) => hasIndex(param) && invertCondition(param.indexOf(value as any) >= 0, invert), error
        )
      )
    )
  )
);