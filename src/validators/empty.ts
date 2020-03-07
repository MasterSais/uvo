import { V_EM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isEmpty, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/empty}
 */
export const empty = <T extends unknown>(error?: Error): Validator<T> =>
  (
    (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
      isEmpty(value)
        ? value
        : applyError(error, onError, setMetaValidator(meta, V_EM, []))
  );