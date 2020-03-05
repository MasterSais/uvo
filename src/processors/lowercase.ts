import { Processor } from '../types';

/**
 * Lowercase input string.
 * 
 * Type: processor. Processors do not check params' and values' types. Escape usage without validators.
 * 
 * @return {Processor} Function that takes value.
 */
export const lowercase = (): Processor<string, string> =>
  (value: string): string => value.toLowerCase();

/**
 * @borrows lcs as lowercase
 */
export const lcs = lowercase;