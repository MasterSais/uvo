import { ObjectLike, Validator } from '../types';

/**
 * {@link docs/processors/keys-map}
 */
export const keysMap = <T extends ObjectLike>(mapper: (key: string) => string): Validator<T, T> => (
  (value: T): T => (Object
    .keys(value)
    .forEach(key => (
      value[mapper(key) as keyof T] = value[key],
      delete value[key]
    )), value
  )
);