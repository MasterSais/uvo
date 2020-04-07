import { Validator } from '@lib/classic-api/types';

const trimMethods = {
  left: 'trimLeft',
  right: 'trimRight'
};

/**
 * {@link docs/classic-api/processors/trim}
 */
export const trim = (method?: 'left' | 'right'): Validator<string, string> =>
  (value: string): string => value[trimMethods[method] || 'trim']();