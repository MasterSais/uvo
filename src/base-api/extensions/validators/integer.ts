import { V_INT } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {integer}
 * 
 * @template {via `provide`}
 * 
 * @scheme {integer(error?: Error): Validator<number>}
 * 
 * @desc Checks number to be an integer.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const integer = (
  (error?: Error) => isFactory(V_INT)(
    (value: number) => typeof value === 'number' && value % 1 === 0, error
  )
);