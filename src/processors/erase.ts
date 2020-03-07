import { Processor } from '../types';

/**
 * {@link docs/processors/erase}
 */
export const erase = <T>(): Processor<T, T> =>
  (): T => null;

/**
 * {@link docs/processors/erase}
 */
export const ers = erase;