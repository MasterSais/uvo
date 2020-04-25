import { Validator } from '@lib/base-api/types';

const trimMethods = {
  left: 'trimLeft',
  right: 'trimRight'
};

/**
 * {@link docs/base-api/processors/trim}
 */
export const trim = (method?: 'left' | 'right'): Validator<string, string> =>
  (value: string): string => value[trimMethods[method] || 'trim']();