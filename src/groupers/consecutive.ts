import { G_CONS } from '../names';
import { ErrorCallback, MetaData, Processor } from '../types';
import { isValidatorsSequence, reduceValidators, throwValidatorError } from '../utilities';

/**
 * {@link docs/groupers/consecutive}
 */
export const consecutive = <T>(...validators: Array<Processor<any, T> | Processor<any, T>>): Processor<any, T> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: any, onError?: ErrorCallback, meta?: MetaData): T =>
          reduceValidators(value, onError, meta, validators)
      )
      : throwValidatorError(G_CONS)
  );