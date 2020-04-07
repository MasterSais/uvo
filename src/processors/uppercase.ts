import { Validator } from '../types';

/**
 * {@link docs/classic-api/processors/uppercase}
 */
export const uppercase = (): Validator<string, string> =>
  (value: string): string => value.toUpperCase();