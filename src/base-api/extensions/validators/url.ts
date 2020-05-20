import { V_URL } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const urlRegEx = /^https?:\/\/[^\s$.?#].[^\s]*$/i;

/**
 * @name {url}
 * 
 * @template {via `provide`}
 * 
 * @scheme {url(error?: ValidatorError): Validator<string>}
 * 
 * @desc URL validation.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const url = (
  (error?: ValidatorError) => isFactory(V_URL)(
    (value: string) => value && urlRegEx.test(value), error
  )
);