import { V_OCT } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const octRegEx = /^(0o)?[0-7]+$/i;

/**
 * @name {oct}
 * 
 * @template {via `provide`}
 * 
 * @scheme {oct(error?: ValidatorError): Validator<string>}
 * 
 * @desc Checks if the string is a octal number.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const oct = (
  (error?: ValidatorError) => isFactory(V_OCT)(
    (value: string) => value && octRegEx.test(value), error
  )
);