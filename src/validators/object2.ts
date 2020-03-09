import { isArray } from 'util';
import { consecutive } from '../groupers/consecutive';
import { V_OBJ } from '../names';
import { Error, ErrorCallback, MetaData, ObjectLike, Processor } from '../types';
import { applyError, isObject, setMetaPath, setMetaValidator, toArray, throwValidatorError } from '../utilities';

const isNestedArrays = (value: Array<Array<any>>) => isArray(value) && (
  value.reduce((result, item) => result && isArray(item), true)
);

/**
 * {@link docs/validators/object2}
 */
export const object2 = <T extends ObjectLike, R = T>(spec?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R> => {
  const specList: Array<[string, Array<Processor<any, any>>]> = [];

  const isSpecArray = isNestedArrays(spec);

  isSpecArray && (
    spec.forEach(([key, ...validators]) => specList.push([key, toArray(validators)]))
  );

  const isSpecValid = isSpecArray && specList.reduce(
    (result: boolean, [key]) => result && key.length > 0, true
  );

  if (isSpecValid || !spec) {
    const validators: Array<[string, Processor<any, any>]> =
      spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);

    return (data: T, onError?: ErrorCallback, meta?: MetaData): R =>
      (
        data !== null
        && isObject(data)
      )
        ? (validators
          ? validators.reduce((result: R, [key, processor]) => (
            result[key as keyof R] = processor(data[key], onError, setMetaPath(meta, key)), result), {} as R
          )
          : data) as R
        : applyError(error, onError, setMetaValidator(meta, V_OBJ, [spec]));
  } else {
    return throwValidatorError(V_OBJ);
  }
};