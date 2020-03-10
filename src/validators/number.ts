import { V_NUM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isArray, isFinite, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/number}
 */
export const number = <T extends unknown>(error?: Error): Validator<T, number> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
    (
      value !== null
      && value !== String()
      && !isArray(value)
      && isFinite(value)
    )
      ? Number(value) : applyError(error, onError, setMetaValidator(meta, V_NUM));