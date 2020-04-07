import { isArray } from 'util';
import { consecutive } from '../groupers/consecutive';
import { V_OBJ } from '../names';
import { Error, ErrorCallback, MetaData, ObjectLike, Validator } from '../types';
import { applyError, extendMeta, isDefined, isObject, isRegEx, isString, setMetaPath, throwValidatorError, toArray } from '../utilities';

const isNestedArrays = (value: Array<Array<any>>) => isArray(value) && (
  value.reduce((result, item) => result && isArray(item), true)
);

const getField = <T extends ObjectLike, R = T>(data: T, result: T, field: any) =>
  isDefined(result[field]) ? result[field] : data[field];

/**
 * {@link docs/classic-api/validators/object2}
 */
export const object2 = <T extends ObjectLike, R = T>(spec?: Array<[string | RegExp, ...Array<Validator<any, any>>]>, error?: Error): Validator<T, R> => {
  const specList: Array<[string | RegExp, Array<Validator<any, any>>]> = [];

  const isSpecValid = isNestedArrays(spec) && (
    spec.reduce((result, [key, ...validators]) => (
      (
        specList.push([key, toArray(validators)])
      ),
      (
        result && (isString(key) || isRegEx(key))
      )
    ), true)
  );

  spec && !isSpecValid && throwValidatorError(V_OBJ);

  const validators: Array<[string | RegExp, Validator<any, any>]> =
    spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);

  return (data: T, onError?: ErrorCallback, meta?: MetaData): R => {
    extendMeta(meta, data, V_OBJ);

    if (isObject(data)) {
      const keys = Object.keys(data);

      return (
        validators
          ? (
            validators.reduce((result, [key, processor]) => (
              (
                isString(key)
                  ? result[key as string] = processor(getField(data, result, key), onError, setMetaPath(meta, key as string))
                  : keys.forEach(objKey => ((key as RegExp).test(objKey) && (result[objKey] = processor(getField(data, result, objKey), onError, setMetaPath(meta, objKey)))))
              ), result
            ), {})
          )
          : data
      ) as R;
    }

    return applyError(error, onError, meta);
  };
};