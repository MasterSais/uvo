import { Validator } from '../types';

/**
 * {@link docs/processors/erase}
 */
export const erase = <T>(): Validator<T, null> =>
  (): null => null;