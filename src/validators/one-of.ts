import { V_OOF } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isArray, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/one-of}
 */
export const oneOf = <T>(candidates: Array<T>, error?: Error): Validator<T> =>
  (
    isArray(candidates)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && candidates.indexOf(value) >= 0
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_OOF, [candidates]))
      )
      : throwValidatorError(V_OOF)
  );

/**
 * {@link docs/validators/one-of}
 */
export const oof = oneOf;