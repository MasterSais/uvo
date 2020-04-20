import { C_OER } from '@lib/classic-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { callee, isFunction, isValidatorsSequence, reduceValidators, throwValidatorError } from '@lib/classic-api/utilities';

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
              errorProcessor(callee(error)(meta), meta, relevance)
            ),
            meta,
            validators
          )
      )
      : throwValidatorError(C_OER)
  );