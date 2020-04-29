import { V_NEG } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {negative}
 * 
 * @template {via `provide`}
 * 
 * @scheme {negative(error?: Error): Validator<number>}
 * 
 * @desc Checks number to be negative.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const negative = (
  (error?: Error) => isFactory(V_NEG)(
    (value: number) => Number.isFinite(value) && value < 0, error
  )
);