import { Validator } from '../types';

const trimMethods = {
  left: 'trimLeft',
  right: 'trimRight'
};

/**
 * {@link docs/processors/trim}
 */
export const trim = (method?: 'left' | 'right'): Validator<string, string> =>
  (value: string): string => value[trimMethods[method] || 'trim']();