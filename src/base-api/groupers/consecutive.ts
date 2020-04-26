import { G_CONS } from '@lib/base-api/names';
import { ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { isValidatorsSequence } from '@lib/base-api/utilities/types';
import { passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';
import { makeAsync } from '../utilities/factories';

/**
 * {@link docs/base-api/groupers/consecutive}
 */
export const consecutive = <T>(...validators: Array<Validator<any, T>>): Validator<any, T> =>
  (
    isValidatorsSequence(validators)
      ? (
        // Presume sequnce to be async.
        makeAsync(
          (value: any, onError?: ErrorCallback, meta?: MetaData): T =>
            passValidators(value, onError, meta, validators)
        )
      )
      : throwValidatorError(G_CONS)
  );