import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';
import { V_MAIL } from '@lib/extended-api/names';

const fastEmailRegEx = new RegExp(/^\S+@\S+\.\S+$/);

/**
 * @name {fastEmail}
 * 
 * @template {`@fastEmail`}
 * 
 * @scheme {email(error?: Error): Validator<string>}
 * 
 * @desc Fast email validation.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const fastEmail = (
  (error?: Error) => isFactory(V_MAIL)(
    (value: string) => fastEmailRegEx.test(value), error
  )
);