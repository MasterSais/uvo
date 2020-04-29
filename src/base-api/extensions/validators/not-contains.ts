import { V_CNTS } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { invertError, isFactory } from '@lib/base-api/utilities/factories';

/**
 * @name {notContains}
 * 
 * @template {via `provide`}
 * 
 * @scheme {notContains(seed: any, error?: Error): Validator<string | Array<any>>}
 * 
 * @desc Checks if the string or array does not contain the seed.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const notContains = (
  (seed: any, error?: Error) => isFactory(invertError(V_CNTS, true), seed)(
    (value: string | Array<any>, sub: any) => value && value.indexOf && value.indexOf(sub) < 0, error
  )
);