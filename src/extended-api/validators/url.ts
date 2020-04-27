import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';
import { V_URL } from '@lib/extended-api/names';

const urlRegEx = new RegExp(/^https?:\/\/[^\s$.?#].[^\s]*$/i);

/**
 * @name {url}
 * 
 * @template {`@url`}
 * 
 * @scheme {url(error?: Error): Validator<string>}
 * 
 * @desc Url validation.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const url = (
  (error?: Error) => isFactory(V_URL)(
    (value: string) => urlRegEx.test(value), error
  )
);