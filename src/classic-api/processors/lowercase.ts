import { Validator } from '@lib/classic-api/types';

/**
 * {@link docs/classic-api/processors/lowercase}
 */
export const lowercase = (): Validator<string, string> =>
  (value: string): string => value.toLowerCase();