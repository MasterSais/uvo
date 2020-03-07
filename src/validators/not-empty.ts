import { V_NEM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isEmpty, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/not-empty}
 */
export const notEmpty = <T extends unknown>(error?: Error): Validator<T> =>
  (
    (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
      !isEmpty(value)
        ? value
        : applyError(error, onError, setMetaValidator(meta, V_NEM, []))
  );

/**
 * {@link docs/validators/not-empty}
 */
export const nem = notEmpty;