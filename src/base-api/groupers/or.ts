import { G_OR } from '@lib/base-api/names';
import { ValidatorError, ValidatorErrorCallback, MetaData, Relevance, Validator } from '@lib/base-api/types';
import { isValidatorsSequence } from '@lib/base-api/utilities/types';
import { throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/groupers/or}
 */
export const or = (...validators: Array<Validator<any, any>>): Validator<any, any> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: unknown, onError?: ValidatorErrorCallback, meta?: MetaData): unknown => {
          let processed = null;

          const relevance: Relevance = { value: false };

          validators.find((nextValidator: Validator<unknown, unknown>) =>
            (
              processed = nextValidator(value, onError ? (error: ValidatorError, meta?: MetaData) => onError(error, meta, relevance) : null, meta),
              processed !== null
            )
          );

          if (processed === null) {
            relevance.value = true;
          }

          return processed;
        }
      )
      : throwValidatorError(G_OR)
  );