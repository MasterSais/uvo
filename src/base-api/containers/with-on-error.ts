import { C_OER } from '@lib/base-api/names';
import { ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { callee, isFunction, isValidatorsSequence } from '@lib/base-api/utilities/types';
import { passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/containers/with-on-error}
 */
export const withOnError = <T>(errorProcessor: ValidatorErrorCallback, ...validators: Array<Validator<any, T>>): Validator<any, T> =>
  (
    isValidatorsSequence(validators) && isFunction(errorProcessor)
      ? (
        (value: any, _onError?: ValidatorErrorCallback, meta?: MetaData): T =>
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