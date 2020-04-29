import { V_HEX } from '@lib/base-api/extensions/names';
import { Error } from '@lib/base-api/types';
import { isFactory } from '@lib/base-api/utilities/factories';

const hexRegEx = /^(0x|0h)?[0-9A-F]+$/i;

/**
 * @name {hex}
 * 
 * @template {via `provide`}
 * 
 * @scheme {hex(error?: Error): Validator<string>}
 * 
 * @desc Checks if the string is a hexadecimal number.
 * 
 * {@link docs/base-api/type-validator}
 * 
 * {@link docs/base-api/error-param}
 * 
 * {@link docs/base-api/validator-result}
 */
export const hex = (
  (error?: Error) => isFactory(V_HEX)(
    (value: string) => value && hexRegEx.test(value), error
  )
);