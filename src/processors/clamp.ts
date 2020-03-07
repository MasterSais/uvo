import { Processor } from '../types';

/**
 * {@link docs/processors/clamp}
 */
export const clamp = <T>(min: T, max: T): Processor<T, T> =>
  (value: T): T => value < min ? min : (value > max ? max : value);