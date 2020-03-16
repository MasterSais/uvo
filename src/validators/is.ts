import { V_IS, V_LEN, V_MLP, V_OOF, V_REG } from '../names';
import { Error, ErrorCallback, Invertible, Lengthy, MetaData, Validator } from '../types';
import { applyError, invertCondition, invertError, isArray, isFiniteNumber, isFunction, isLengthy, isNumber, isRegEx, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

const isFactory = (validator: string, params?: Array<any>) =>
  (
    <T>(comparator: ((value: T) => boolean), error?: Error): Validator<T> =>
      (
        isFunction(comparator)
          ? (
            (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
              comparator(value)
                ? value
                : applyError(error, onError, setMetaValidator(meta, validator, params || []))
          )
          : throwValidatorError(validator)
      )
  );

const lengthFactory = (validator: string, comparator: ((value: number, len: number) => boolean)) => (
  (
    makeInvertible<(<T extends Lengthy>(len: number, error?: Error) => Validator<T>)>(
      (
        (invert: boolean) => <T extends Lengthy>(len: number, error?: Error) => isFactory(invertError(validator, invert), [len])(
          (
            (isFiniteNumber(len) && len >= 0)
              ? (
                (value: T) => invertCondition(isLengthy(value) && comparator(value.length, len), invert)
              )
              : throwValidatorError(invertError(validator, invert))
          ), error
        )
      )
    )
  )
);

const multipleFactory = (validator: string) => (
  (
    makeInvertible<((multiplier: number, error?: Error) => Validator<number>)>(
      (
        (invert: boolean) => (multiplier: number, error?: Error): Validator<number> => isFactory(invertError(validator, invert), [multiplier])(
          (
            isNumber(multiplier)
              ? (
                (value: number) => invertCondition(isNumber(value) && value % multiplier === 0, invert)
              )
              : throwValidatorError(invertError(validator, invert))
          ), error
        )
      )
    )
  )
);

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
 * {@link docs/validators/length}
 */
export const length = lengthFactory(V_LEN, (value: number, len: number) => value === len);

/**
 * {@link docs/validators/min-len}
 */
export const minLen = lengthFactory(V_LEN, (value: number, len: number) => value >= len);

/**
 * {@link docs/validators/max-len}
 */
export const maxLen = lengthFactory(V_LEN, (value: number, len: number) => value <= len);

/**
 * {@link docs/validators/multiple}
 */
export const multiple = multipleFactory(V_MLP);

/**
 * {@link docs/validators/integer}
 */
export const integer: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_MLP)(1, error);

integer.not = (error?: Error) => multipleFactory(V_MLP).not(1, error);

/**
 * {@link docs/validators/integer}
 */
export const even: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_MLP)(2, error);

even.not = (error?: Error) => multipleFactory(V_MLP).not(2, error);