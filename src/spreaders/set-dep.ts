import { S_SDP } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isDefined, isFunction, isString, postToMeta, throwValidatorError } from '../utilities';

/**
 * Puts value into spreaded structure.
 * If 'extValue' is provided, puts it instead of current value.
 * 
 * Type: spreader. Spreads data through a validators scheme.
 * 
 * @param {string} field Spreaded value name.
 * @param {any} extValue External value or function that returns it.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'field' is invalid.
 */
export const setDep = <T>(field: string, extValue?: T | (() => T)): Validator<T> =>
  (
    (isString(field) && field.length > 0)
      ? (
        (value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
          postToMeta(
            isDefined(extValue)
              ? (
                isFunction(extValue)
                  ? (extValue as Function)(meta)
                  : extValue
              )
              : value,
            field, meta
          )
      )
      : throwValidatorError(S_SDP)
  );