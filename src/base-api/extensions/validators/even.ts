import { V_EVN } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {even}
 * 
 * @template {via `provide`}
 * 
 * @scheme {even(error?: ValidatorError): Validator<number>}
 * 
 * @desc Checks number to be an even one.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const even = (
  (error?: ValidatorError) => isFactory(V_EVN)(
    (value: number) => typeof value === 'number' && value % 2 === 0, error
  )
);