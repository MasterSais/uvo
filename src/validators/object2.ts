import { isArray } from 'util';
import { consecutive } from '../groupers/consecutive';
import { V_OBJ } from '../names';
import { Error, ErrorCallback, MetaData, ObjectLike, Validator } from '../types';
import { applyError, isObject, isRegEx, isString, setMetaPath, setMetaValidator, throwValidatorError, toArray } from '../utilities';

const isNestedArrays = (value: Array<Array<any>>) => isArray(value) && (
  value.reduce((result, item) => result && isArray(item), true)
);

/**
 * {@link docs/validators/object2}
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

  if (isSpecValid || !spec) {
    const validators: Array<[string | RegExp, Validator<any, any>]> =
      spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);

    return (data: T, onError?: ErrorCallback, meta?: MetaData): R => {
      if (isObject(data)) {
        const keys = Object.keys(data);

        return (
          validators
            ? (
              validators.reduce((result, [key, processor]) => (
                (
                  isString(key)
                    ? result[key as string] = processor(data[key as string], onError, setMetaPath(meta, key as string))
                    : keys.forEach(objKey => ((key as RegExp).test(objKey) && (result[objKey] = processor(data[objKey], onError, setMetaPath(meta, objKey)))))
                ), result
              ), {})
            )
            : data
        ) as R;
      }

      return applyError(error, onError, setMetaValidator(meta, V_OBJ, [spec]));
    };
  }

  return throwValidatorError(V_OBJ);
};