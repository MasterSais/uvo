import { V_BIN } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const binRegEx = /^(0b)?[0-1]+$/i;

/**
 * @name {bin}
 * 
 * @template {via `provide`}
 * 
 * @scheme {bin(error?: Error): Validator<string>}
 * 
 * @desc Checks if the string is a binary number.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const bin = (
  (error?: Error) => isFactory(V_BIN)(
    (value: string) => value && binRegEx.test(value), error
  )
);