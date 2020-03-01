import { G_OR } from '../names';
import { Error, ErrorCallback, MetaData, Processor, Relevance } from '../types';
import { isValidatorsSequence, throwValidatorError } from '../utilities';

/**
 * Groups validators sequentially.
 * Searches for first successful validator's result.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Processor} validators Validators list.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const or = <T>(...validators: Array<Processor<T, unknown>>): Processor<T, unknown> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): unknown => {
          let processed = null;

          const relevance: Relevance = { value: false };

          validators.find((nextValidator: Processor<T, unknown>) =>
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