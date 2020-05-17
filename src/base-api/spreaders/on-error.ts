import { C_OER } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { callee, isFunction, isValidatorsSequence } from '@lib/base-api/utilities/types';
import { passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/spreaders/on-error}
 */
export const onError = <T>(errorProcessor: ErrorCallback, ...validators: Array<Validator<any, T>>): Validator<any, T> =>
  (
    isValidatorsSequence(validators) && isFunction(errorProcessor)
      ? (
        (value: any, _onError?: ErrorCallback, meta?: MetaData): T =>
          passValidators(
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