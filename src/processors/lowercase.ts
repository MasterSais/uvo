import { Validator } from '../types';

/**
 * {@link docs/classic-api/processors/lowercase}
 */
export const lowercase = (): Validator<string, string> =>
  (value: string): string => value.toLowerCase();