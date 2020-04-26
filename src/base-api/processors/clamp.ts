import { Validator } from '@lib/base-api/types';

/**
 * {@link docs/base-api/processors/clamp}
 */
export const clamp = <T>(min: T, max: T): Validator<T, T> =>
  (value: T): T => value <= min ? min : (value > max ? max : value);