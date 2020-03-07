import { Processor } from '../types';

/**
 * {@link docs/processors/uppercase}
 */
export const uppercase = (): Processor<string, string> =>
  (value: string): string => value.toUpperCase();