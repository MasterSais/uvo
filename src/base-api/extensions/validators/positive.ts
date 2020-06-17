import { V_POS } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {positive}
 * 
 * @template {via `provide`}
 * 
 * @scheme {positive(error?: ValidatorError): Validator<number>}
 * 
 * @desc Checks number to be positive.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const positive = (
  (error?: ValidatorError) => isFactory(V_POS)(
    (value: number) => Number.isFinite(value) && value > 0, error
  )
);