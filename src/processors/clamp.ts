import { Validator } from '../types';

/**
 * {@link docs/processors/clamp}
 */
export const clamp = <T>(min: T, max: T): Validator<T, T> =>
  (value: T): T => value < min ? min : (value > max ? max : value);