import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { V_OBJ } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, ObjectLike, Validator } from '@lib/classic-api/types';
import { callee, isArray, isDefined, isObject, isString, toArray } from '@lib/classic-api/utilities/types';
import { applyError, asyncActor, extendMeta, setMetaPath, throwValidatorError } from '@lib/classic-api/utilities/utilities';

const isNestedArrays = (value: Array<Array<any>>) => isArray(value) && (
  value.reduce((result, item) => result && isArray(item), true)
);

const mapObject2Validators = (spec?: Array<[string | RegExp | Array<string> | (() => string | RegExp | Array<string>), ...Array<Validator<any, any>>]>): Array<[() => string | RegExp, Validator<any, any>]> => (
  isNestedArrays(spec)
    ? spec.map(([key, ...validators]) => [callee(key), consecutive(...toArray(validators))])
    : spec && throwValidatorError(V_OBJ)
);

/**
 * {@link docs/classic-api/validators/object2}
 */
export const object2 = <T extends ObjectLike, R = T>(spec?: Array<[string | RegExp | Array<string> | (() => string | RegExp | Array<string>), ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R> => (
  spec = mapObject2Validators(spec),

  (data: T, onError?: ErrorCallback, meta?: MetaData): R => {
    extendMeta(meta, data, V_OBJ);

    if (!isObject(data)) {
      return applyError(error, onError, meta);
    }

    const [actAsync, proceedAsync] = asyncActor(meta);

    const keys = Object.keys(data);

    return (
      spec
        ? (
          proceedAsync(
            spec.reduce((result, [key, processor]: any) => {
              const keySpec: any = key();

              const setField = (field: string) => (
                actAsync(
                  processor(
                    isDefined(result[field]) ? result[field] : data[field],
                    onError,
                    setMetaPath(meta, field)
                  ),
                  value => (result[field] = value)
                )
              );

              isString(keySpec)
                ? setField(keySpec)
                : (
                  keys.forEach(
                    isArray(keySpec)
                      ? field => keySpec.indexOf(field) >= 0 && setField(field)
                      : field => keySpec.test(field) && setField(field)
                  )
                );

              return result;
            }, {})
          )
        )
        : data
    );
  }
);