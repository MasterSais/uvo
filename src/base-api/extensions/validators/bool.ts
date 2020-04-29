import { V_ISBOOL } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {bool}
 * 
 * @template {via `provide`}
 * 
 * @scheme {bool(error?: Error): Validator<boolean>}
 * 
 * @desc Checks for boolean type.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const bool = (
  (error?: Error) => isFactory(V_ISBOOL)(
    (value: boolean) => typeof value === 'boolean', error
  )
);