import { Validator } from '@lib/base-api/types';

/**
 * @name {erase}
 * 
 * @template {via `provide`}
 * 
 * @scheme {erase<T>(): Validator<T, null>}
 * 
 * @desc Erase input.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * {@link docs/base-api/processor-result}
 */
export const erase = <T>(): Validator<T, null> =>
  (): null => null;