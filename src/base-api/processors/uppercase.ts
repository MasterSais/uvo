import { Validator } from '@lib/base-api/types';

/**
 * {@link docs/base-api/processors/uppercase}
 */
export const uppercase = (): Validator<string, string> =>
  (value: string): string => value.toUpperCase();