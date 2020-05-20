import { V_ISDATE } from '@lib/base-api/extensions/names';
import { ValidatorError } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {date}
 * 
 * @template {via `provide`}
 * 
 * @scheme {date<T>(error?: ValidatorError): Validator<T>}
 * 
 * @desc Checks for right date.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const date = (
  (error?: ValidatorError) => isFactory(V_ISDATE)(
    <T>(value: T) => value !== null && !isNaN(new Date(value as any) as any), error
  )
);