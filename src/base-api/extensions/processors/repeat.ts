import { Validator } from '@lib/base-api/types';

/**
 * @name {repeat}
 * 
 * @template {via `provide`}
 * 
 * @scheme {repeat(count: number): Validator<string, string>}
 * 
 * @desc Repeats the string.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */
export const repeat = (count: number): Validator<string, string> =>
  (value: string): string => value.repeat(count);