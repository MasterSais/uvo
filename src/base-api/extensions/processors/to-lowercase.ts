import { Validator } from '@lib/base-api/types';

/**
 * @name {toLower}
 * 
 * @template {via `provide`}
 * 
 * @scheme {toLower(): Validator<string, string>}
 * 
 * @desc Lowercase input string.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */
export const toLower = (): Validator<string, string> =>
  (value: string): string => value.toLowerCase();