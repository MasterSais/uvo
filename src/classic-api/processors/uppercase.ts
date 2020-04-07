import { Validator } from '@lib/classic-api/types';

/**
 * {@link docs/classic-api/processors/uppercase}
 */
export const uppercase = (): Validator<string, string> =>
  (value: string): string => value.toUpperCase();