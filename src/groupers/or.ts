import { G_OR } from '../names';
import { Error, ErrorCallback, MetaData, Validator, Relevance } from '../types';
import { isValidatorsSequence, throwValidatorError } from '../utilities';

/**
 * {@link docs/classic-api/groupers/or}
 */
export const or = (...validators: Array<Validator<any, any>>): Validator<any, any> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: unknown, onError?: ErrorCallback, meta?: MetaData): unknown => {
          let processed = null;

          const relevance: Relevance = { value: false };

          validators.find((nextValidator: Validator<unknown, unknown>) =>
            (
              processed = nextValidator(value, onError ? (error: Error, meta?: MetaData) => onError(error, meta, relevance) : null, meta),
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