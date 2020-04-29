import { Validator } from '@lib/base-api/types';

/**
 * @name {toUpper}
 * 
 * @template {via `provide`}
 * 
 * @scheme {toUpper(): Validator<string, string>}
 * 
 * @desc Uppercase input string.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */
export const toUpper = (): Validator<string, string> =>
  (value: string): string => value.toUpperCase();