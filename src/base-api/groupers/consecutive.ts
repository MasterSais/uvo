import { G_CONS } from '@lib/base-api/names';
import { Validator } from '@lib/base-api/types';
import { makeSequence } from '@lib/base-api/utilities/factories';
import { isValidatorsSequence } from '@lib/base-api/utilities/types';
import { throwValidatorError } from '@lib/base-api/utilities/utilities';

/**
 * {@link docs/base-api/groupers/consecutive}
 */
export const consecutive = <T>(...validators: Array<Validator<any, T>>): Validator<any, T> =>
  (
    isValidatorsSequence(validators)
      ? makeSequence(validators)
      : throwValidatorError(G_CONS)
  );