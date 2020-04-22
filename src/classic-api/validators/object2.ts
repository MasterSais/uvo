import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { V_OBJ } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, ObjectLike, Validator } from '@lib/classic-api/types';
import { callee, isArray, isDefined, isObject, isString, toArray } from '@lib/classic-api/utilities/types';
import { applyError, asyncActor, extendMeta, setMetaPath, throwValidatorError } from '@lib/classic-api/utilities/utilities';

const isNestedArrays = (value: Array<Array<any>>) => isArray(value) && (
  value.reduce((result, item) => result && isArray(item), true)
);

const getField = <T extends ObjectLike, R = T>(data: T, result: R, field: any) => (
  isDefined(result[field]) ? result[field] : data[field]
);

const mapObject2Validators = (spec?: Array<[string | RegExp | Array<string> | (() => string | RegExp | Array<string>), ...Array<Validator<any, any>>]>) => (
  isNestedArrays(spec)
    ? spec.map(([key, ...validators]) => [callee(key), consecutive(...toArray(validators))])
    : spec && throwValidatorError(V_OBJ)
);

/**
 * {@link docs/classic-api/validators/object2}
 */
export const object2 = <T extends ObjectLike, R = T>(spec?: Array<[string | RegExp | Array<string> | (() => string | RegExp | Array<string>), ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R> => (
  spec = mapObject2Validators(spec) as Array<[() => string | RegExp, Validator<any, any>]>,

  (data: T, onError?: ErrorCallback, meta?: MetaData): R => {
    const [actAsync, proceedAsync] = asyncActor(meta);

    extendMeta(meta, data, V_OBJ);

    if (!isObject(data)) {
      return applyError(error, onError, meta);
    }

    const keys = Object.keys(data);

    const onKey = (keyProcessor: (key: string) => void) => keys.forEach(keyProcessor);

    return (
      spec
        ? (
          proceedAsync(
            (spec as Array<[() => string | RegExp, Validator<any, any>]>).reduce((result, [key, processor]) => {
              const keySpec: any = key();

              const setField = (field: string) => (
                actAsync(
                  processor(getField(data, result, field), onError, setMetaPath(meta, field)),
                  value => (result[field] = value)
                )
              );

              isString(keySpec)
                ? setField(keySpec)
                : onKey(
                  isArray(keySpec)
                    ? field => keySpec.indexOf(field) >= 0 && setField(field)
                    : field => keySpec.test(field) && setField(field)
                );

              return result;
            }, {})
          )
        )
        : data
    ) as R;
  }
);