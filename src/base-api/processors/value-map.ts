import { Primitive, Validator } from '@lib/base-api/types';
import { callee, isFunction, isRegEx } from '@lib/base-api/utilities/types';

/**
 * {@link docs/base-api/processors/value-map}
 */
export const valueMap = <T, R>(...mappers: Array<[Primitive | ((value: T) => boolean) | RegExp, Primitive | ((value: T) => R)]>): Validator<T, R> => (
  (value: T): R => {
    const mapper = mappers.find(([match]) => (
      isFunction(match) && (match as Function)(value)
      ||
      isRegEx(match) && (match as RegExp).test(value as unknown as string)
      ||
      value === match as unknown as T
    ));

    return (
      mapper
        ? callee(mapper[1])(value)
        : value as unknown as R
    );
  }
);