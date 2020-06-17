import { V_ALNUM } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const alphanumRegEx = /^[A-F0-9]+$/i;

/**
 * @name {alphanum}
 * 
 * @template {via `provide`}
 * 
 * @scheme {alphanum(error?: ValidatorError): Validator<string>}
 * 
 * @desc Checks if the string contains only letters (a-zA-Z) and numbers.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const alphanum = (
  (error?: ValidatorError) => isFactory(V_ALNUM)(
    (value: string) => value && alphanumRegEx.test(value), error
  )
);