import { Validator } from '@lib/base-api/types';

const trimMethods = {
  left: 'trimLeft',
  right: 'trimRight'
};

/**
 * @name {trim}
 * 
 * @template {via `provide`}
 * 
 * @scheme {trim(method?: 'left' | 'right'): Validator<string, string>}
 * 
 * @desc Trim input string with specific method.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */
export const trim = (method?: 'left' | 'right'): Validator<string, string> =>
  (value: string): string => value[trimMethods[method] || 'trim']();