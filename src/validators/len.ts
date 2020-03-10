import { V_LEN } from '../names';
import { Error, ErrorCallback, Lengthy, MetaData, Validator } from '../types';
import { applyError, invertCondition, isFiniteNumber, isObjectLike, isString, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/len}
 */
export const len = makeInvertible<(<T extends Lengthy>(len: number, error?: Error) => Validator<T>)>(
  (invert: boolean) => <T extends Lengthy>(len: number, error?: Error): Validator<T> =>
    (
      (isFiniteNumber(len) && len >= 0)
        ? (
          (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
            (
              invertCondition((
                value !== null
                && (isObjectLike(value) || isString(value))
                && isFiniteNumber(value.length)
                && value.length === len
              ), invert)
            )
              ? value : applyError(error, onError, setMetaValidator(meta, V_LEN, [len]))
        )
        : throwValidatorError(V_LEN)
    )
);