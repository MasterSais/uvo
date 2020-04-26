import { Validator } from '@lib/base-api/types';

/**
 * {@link docs/base-api/processors/lowercase}
 */
export const lowercase = (): Validator<string, string> =>
  (value: string): string => value.toLowerCase();