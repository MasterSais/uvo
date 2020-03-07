import { V_EQ } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/equal}
 */
export const equal = <T>(match: T, error?: Error): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (
      value === match
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_EQ, [match]));