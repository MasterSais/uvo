import { Primitive, Validator } from '../types';
import { isFunction, isRegEx } from '../utilities';

/**
 * {@link docs/processors/value-map}
 */
export const valueMap = <T, R>(map: Array<[Primitive | ((value: T) => boolean) | RegExp, Primitive | ((value: T) => R)]>): Validator<T, R> => (
  (value: T): R => {
    const mapper = map.find(([match]) => (
      isFunction(match) && (match as Function)(value)
      ||
      isRegEx(match) && (match as RegExp).test(value as unknown as string)
      ||
      value === match as unknown as T
    ));

    return (
      mapper
        ? isFunction(mapper[1])
          ? (mapper[1] as unknown as Function)(value)
          : mapper[1]
        : value as unknown as R
    );
  }
);