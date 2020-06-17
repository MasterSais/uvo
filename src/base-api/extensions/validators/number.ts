import { V_ISNUM } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {number}
 * 
 * @template {via `provide`}
 * 
 * @scheme {number(error?: ValidatorError): Validator<string>}
 * 
 * @desc Checks for number type.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const number = (
  (error?: ValidatorError) => isFactory(V_ISNUM)(
    (value: number) => typeof value === 'number', error
  )
);