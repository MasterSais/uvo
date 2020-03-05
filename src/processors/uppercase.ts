import { Processor } from '../types';

/**
 * Uppercase input string.
 * 
 * Type: processor. Processors do not check params' and values' types. Escape usage without validators.
 * 
 * @return {Processor} Function that takes value.
 */
export const uppercase = (): Processor<string, string> =>
  (value: string): string => value.toUpperCase();

/**
 * @borrows ucs as uppercase
 */
export const ucs = uppercase;