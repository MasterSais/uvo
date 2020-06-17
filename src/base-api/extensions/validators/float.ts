import { V_FLT } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {float}
 * 
 * @template {via `provide`}
 * 
 * @scheme {float(error?: ValidatorError): Validator<number>}
 * 
 * @desc Checks number to be float.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const float = (
  (error?: ValidatorError) => isFactory(V_FLT)(
    (value: number) => typeof value === 'number' && value % 1 !== 0, error
  )
);