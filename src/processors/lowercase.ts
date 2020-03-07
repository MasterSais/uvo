import { Processor } from '../types';

/**
 * {@link docs/processors/lowercase}
 */
export const lowercase = (): Processor<string, string> =>
  (value: string): string => value.toLowerCase();