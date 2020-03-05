import { Processor } from '../types';

/**
 * Erase input.
 * 
 * Type: processor. Processors do not check params' and values' types. Escape usage without validators.
 * 
 * @return {Processor} Nullable function.
 */
export const erase = <T>(): Processor<T, T> =>
  (): T => null;

/**
 * @borrows ers as erase
 */
export const ers = erase;