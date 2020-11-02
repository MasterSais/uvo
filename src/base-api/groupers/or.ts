import { G_OR } from '@lib/base-api/names';
import { ValidatorError, ErrorCallback, MetaData, Relevance, Validator } from '@lib/base-api/types';
import { isValidatorsSequence } from '@lib/base-api/utilities/types';
import { throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/groupers/or}
 */
export const or = (...validators: Array<Validator<any, any>>): Validator<any, any> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: unknown, onError?: ErrorCallback, meta?: MetaData): unknown => {
          let processed = null;
          let noErrors = true;

          const relevance: Relevance = { value: false };

          validators.find((nextValidator: Validator<unknown, unknown>) =>
            (
              processed = nextValidator(value, onError ? (error: ValidatorError, meta?: MetaData) => (noErrors = !onError(error, meta, relevance)) : null, meta),
              processed !== null && noErrors
            )
          );

          if (processed === null || !noErrors) {
            relevance.value = true;
          }

          return processed;
        }
      )
      : throwValidatorError(G_OR)
  );