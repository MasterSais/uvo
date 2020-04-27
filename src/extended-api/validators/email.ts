import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';
import { V_MAIL } from '@lib/extended-api/names';

const emailRegEx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

/**
 * @name {email}
 * 
 * @template {`@email`}
 * 
 * @scheme {email(error?: Error): Validator<string>}
 * 
 * @desc Email validation.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const email = (
  (error?: Error) => isFactory(V_MAIL)(
    (value: string) => emailRegEx.test(value), error
  )
);