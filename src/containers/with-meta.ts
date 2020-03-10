import { C_MET } from '../names';
import { ErrorCallback, Validator } from '../types';
import { isFunction, throwValidatorError } from '../utilities';

/**
 * {@link docs/containers/with-meta}
 */
export const withMeta = <T, R>(validator: Validator<T, R>): Validator<T, R> =>
  (
    isFunction(validator)
      ? (
        (value: T, onError?: ErrorCallback): R =>
          validator(value, onError, { path: [], _deps: {}, params: [] })
      )
      : throwValidatorError(C_MET)
  );