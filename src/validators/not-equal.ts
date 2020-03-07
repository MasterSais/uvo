import { V_NEQ } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/not-equal}
 */
export const notEqual = <T>(match: T, error?: Error): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (
      value !== match
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_NEQ, [match]));

/**
 * {@link docs/validators/not-equal}
 */
export const neq = notEqual;