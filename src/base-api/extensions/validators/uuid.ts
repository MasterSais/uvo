import { V_UUID } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const uuidRegEx = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

/**
 * @name {uuid}
 * 
 * @template {via `provide`}
 * 
 * @scheme {uuid(error?: ValidatorError): Validator<string>}
 * 
 * @desc UUID validation.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const uuid = (
  (error?: ValidatorError) => isFactory(V_UUID)(
    (value: string) => value && uuidRegEx.test(value), error
  )
);