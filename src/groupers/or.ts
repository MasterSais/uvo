import { G_OR } from '../names';
import { Error, ErrorCallback, MetaData, Processor, Relevance } from '../types';
import { isValidatorsSequence, validatorParamsError } from '../utilities';

/**
 * Groups validators sequentially.
 * Searches for first successful validator's result.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Validator} validators Validators list.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const or = (...validators: Array<Processor<any, any>>): Processor<any, any> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: any, onError?: ErrorCallback, meta?: MetaData): any => {
          let processed = null;

          const relevance: Relevance = { value: false };

          validators.find((nextValidator: Processor<any, any>) =>
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
      : validatorParamsError(G_OR)
  );