import { V_MAIL } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const fastEmailRegEx = /^\S+@\S+\.\S+$/;

/**
 * @name {emailFast}
 * 
 * @template {via `provide`}
 * 
 * @scheme {emailFast(error?: ValidatorError): Validator<string>}
 * 
 * @desc Fast email validation.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const emailFast = (
  (error?: ValidatorError) => isFactory(V_MAIL)(
    (value: string) => value && fastEmailRegEx.test(value), error
  )
);