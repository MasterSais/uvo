import { V_UPP } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {uppercase}
 * 
 * @template {via `provide`}
 * 
 * @scheme {uppercase(error?: Error): Validator<string>}
 * 
 * @desc Checks string to be in an upper case.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const uppercase = (
  (error?: Error) => isFactory(V_UPP)(
    (value: string) => value.toUpperCase() === value, error
  )
);