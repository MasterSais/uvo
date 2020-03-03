import { C_MET } from '../names';
import { ErrorCallback, Processor } from '../types';
import { isFunction, throwValidatorError } from '../utilities';

/**
 * Provides meta structure.
 * 
 * Type: container. Embraces validator. Provides additional processing.
 * 
 * @param {Processor} validator Validator.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validator' is invalid.
 */
export const withMeta = <T, R>(validator: Processor<T, R>): Processor<T, R> =>
  (
    isFunction(validator)
      ? (
        (value: T, onError?: ErrorCallback): R =>
          validator(value, onError, { path: [], _deps: {}, params: [] })
      )
      : throwValidatorError(C_MET)
  );