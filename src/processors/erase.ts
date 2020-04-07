import { Validator } from '../types';

/**
 * {@link docs/classic-api/processors/erase}
 */
export const erase = <T>(): Validator<T, null> =>
  (): null => null;