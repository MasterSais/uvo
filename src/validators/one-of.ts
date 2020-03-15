import { V_OOF } from '../names';
import { Error, ErrorCallback, Invertible, MetaData, Validator } from '../types';
import { applyError, invertCondition, invertError, isArray, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/one-of}
 */
export const oneOf = makeInvertible<(<T>(candidates: Array<T>, error?: Error) => Validator<T>)>(
  (invert: boolean) => <T>(candidates: Array<T>, error?: Error): Validator<T> =>
    (
      isArray(candidates)
        ? (
          (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
            (
              invertCondition(candidates.indexOf(value) >= 0, invert)
            )
              ? value : applyError(error, onError, setMetaValidator(meta, invertError(V_OOF, invert), [candidates]))
        )
        : throwValidatorError(invertError(V_OOF, invert))
    )
);

const EMPTY_VALUES = [null, undefined, ''];

/**
 * {@link docs/validators/empty}
 */
export const empty = (error?: Error) => oneOf(EMPTY_VALUES, error) as any as Invertible<<T>(error?: Error) => Validator<T>>;

empty.not = (error?: Error) => oneOf.not(EMPTY_VALUES, error) as any as <T>(error?: Error) => Validator<T>;