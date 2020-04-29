import { V_CNTS } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {contains}
 * 
 * @template {via `provide`}
 * 
 * @scheme {contains(seed: any, error?: Error): Validator<string | Array<any>>}
 * 
 * @desc Checks if the string or array contains the seed.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const contains = (
  (seed: any, error?: Error) => isFactory(V_CNTS, seed)(
    (value: string | Array<any>, sub: any) => value && value.indexOf && value.indexOf(sub) >= 0, error
  )
);