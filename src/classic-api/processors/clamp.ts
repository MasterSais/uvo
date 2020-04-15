import { Validator } from '@lib/classic-api/types';

/**
 * {@link docs/classic-api/processors/clamp}
 */
export const clamp = <T>(min: T, max: T): Validator<T, T> =>
  (value: T): T => value <= min ? min : (value > max ? max : value);