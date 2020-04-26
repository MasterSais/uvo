import { Validator } from '@lib/base-api/types';

/**
 * {@link docs/base-api/processors/erase}
 */
export const erase = <T>(): Validator<T, null> =>
  (): null => null;