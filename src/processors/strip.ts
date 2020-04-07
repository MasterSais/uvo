import { ObjectLike, Validator } from '../types';
import { callee, isString } from '../utilities';

/**
 * {@link docs/classic-api/processors/strip}
 */
export const strip = <T extends ObjectLike, K>(field: string | RegExp, condition: boolean | ((value: K) => boolean) = true): Validator<T, T> => {
  const is = callee(condition);

  return (
    isString(field)
      ? (
        (value: T): T => (
          is(value[field as string]) && (delete value[field as string]), value
        )
      )
      : (
        (value: T): T => (
          Object.keys(value).forEach(objKey => (
            (field as RegExp).test(objKey) && is(value[objKey]) && (delete value[objKey])
          )), value
        )
      )
  );
};