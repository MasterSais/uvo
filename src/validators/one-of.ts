import { V_OOF } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, isArray, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

type OneOf = <T>(candidates: Array<T>, error?: Error) => Validator<T>;

/**
 * {@link docs/validators/one-of}
 */
export const oneOf = makeInvertible<OneOf>(
  (invert: boolean) => <T>(candidates: Array<T>, error?: Error): Validator<T> =>
    (
      isArray(candidates)
        ? (
          (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
            (
              invertCondition(candidates.indexOf(value) >= 0, invert)
            )
              ? value : applyError(error, onError, setMetaValidator(meta, V_OOF, [candidates]))
        )
        : throwValidatorError(V_OOF)
    )
);