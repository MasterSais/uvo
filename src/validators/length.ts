import { V_LEN } from '../names';
import { Error, ErrorCallback, Invertible, Lengthy, MetaData, Validator } from '../types';
import { applyError, invertCondition, invertError, isFiniteNumber, isObjectLike, isString, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

const lengthTypes = {
  equal: (l1: number, l2: number) => l1 === l2,
  gte: (l1: number, l2: number) => l1 >= l2,
  lte: (l1: number, l2: number) => l1 <= l2
};

/**
 * {@link docs/validators/length}
 */
export const length = makeInvertible<(<T extends Lengthy>(len: number, type?: 'equal' | 'gte' | 'lte', error?: Error) => Validator<T>)>(
  (invert: boolean) => <T extends Lengthy>(len: number, type: 'equal' | 'gte' | 'lte' = 'equal', error?: Error): Validator<T> =>
    (
      (isFiniteNumber(len) && len >= 0 && lengthTypes[type])
        ? (
          (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
            (
              invertCondition(
                (
                  value !== null
                  && (isObjectLike(value) || isString(value))
                  && isFiniteNumber(value.length)
                  && lengthTypes[type](value.length, len)
                ), invert
              )
            )
              ? value : applyError(error, onError, setMetaValidator(meta, invertError(V_LEN, invert), [len, type]))
        )
        : throwValidatorError(invertError(V_LEN, invert))
    )
);

/**
 * {@link docs/validators/min-len}
 */
export const minLen: Invertible<(<T extends Lengthy>(len: number, error?: Error) => Validator<T>)> = (len: number, error?: Error) => length(len, 'gte', error);

minLen.not = (len: number, error?: Error) => length.not(len, 'gte', error);

/**
 * {@link docs/validators/max-len}
 */
export const maxLen: Invertible<(<T extends Lengthy>(len: number, error?: Error) => Validator<T>)> = (len: number, error?: Error) => length(len, 'lte', error);

maxLen.not = (len: number, error?: Error) => length.not(len, 'lte', error);