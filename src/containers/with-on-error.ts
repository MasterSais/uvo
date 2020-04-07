import { C_OER } from '../names';
import { ErrorCallback, MetaData, Validator } from '../types';
import { isFunction, isValidatorsSequence, reduceValidators, throwValidatorError } from '../utilities';

/**
 * {@link docs/classic-api/containers/with-on-error}
 */
export const withOnError = <T>(errorProcessor: ErrorCallback, ...validators: Array<Validator<any, T>>): Validator<any, T> =>
  (
    isValidatorsSequence(validators) && isFunction(errorProcessor)
      ? (
        (value: any, _onError?: ErrorCallback, meta?: MetaData): T =>
          reduceValidators(
            value,
            (error, meta, relevance) => (
              errorProcessor(
                isFunction(error)
                  ? (error as Function)(meta)
                  : error,
                meta,
                relevance
              )
            ),
            meta,
            validators
          )
      )
      : throwValidatorError(C_OER)
  );