import { V_LOW } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {lowercase}
 * 
 * @template {via `provide`}
 * 
 * @scheme {lowercase(error?: Error): Validator<string>}
 * 
 * @desc Checks string to be in a lower case.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const lowercase = (
  (error?: Error) => isFactory(V_LOW)(
    (value: string) => value.toLowerCase() === value, error
  )
);