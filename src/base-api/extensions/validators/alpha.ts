import { V_AL } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const alphaRegEx = /^[A-F]+$/i;

/**
 * @name {alpha}
 * 
 * @template {via `provide`}
 * 
 * @scheme {alpha(error?: ValidatorError): Validator<string>}
 * 
 * @desc Checks if the string contains only letters (a-zA-Z).
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const alpha = (
  (error?: ValidatorError) => isFactory(V_AL)(
    (value: string) => value && alphaRegEx.test(value), error
  )
);