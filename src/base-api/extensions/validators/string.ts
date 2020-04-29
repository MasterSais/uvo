import { V_ISSTR } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {string}
 * 
 * @template {via `provide`}
 * 
 * @scheme {string(error?: Error): Validator<string>}
 * 
 * @desc Checks for string type.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const string = (
  (error?: Error) => isFactory(V_ISSTR)(
    (value: string) => typeof value === 'string', error
  )
);