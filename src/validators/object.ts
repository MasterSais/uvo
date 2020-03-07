import { consecutive } from '../groupers/consecutive';
import { V_OBJ } from '../names';
import { Error, ErrorCallback, MetaData, ObjectLike, ObjectSpec, Processor } from '../types';
import { applyError, isObject, setMetaPath, setMetaValidator, toArray, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/object}
 */
export const object = <T extends ObjectLike, R extends ObjectLike>(spec?: ObjectSpec, error?: Error): Processor<T, R> => {
  const specList: Array<[string, Array<Processor<any, any>>]> = [];

  const isSpecObject = isObject(spec);

  isSpecObject && (
    Object
      .keys(spec)
      .forEach((key) => specList.push([key, toArray(spec[key])]))
  );

  if (isSpecObject || !spec) {
    const validators: Array<[string, Processor<any, any>]> =
      spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);

    return (data: T, onError?: ErrorCallback, meta?: MetaData): R =>
      (
        data !== null
        && isObject(data)
      )
        ? (
          validators
            ? validators.reduce((result: R, [key, validator]) => (
              result[key as keyof R] = validator(data[key], onError, setMetaPath(meta, key)), result), {} as R
            )
            : data as unknown as R
        )
        : applyError(error, onError, setMetaValidator(meta, V_OBJ, [spec]));
  } else {
    return throwValidatorError(V_OBJ);
  }
};

/**
 * {@link docs/validators/object}
 */
export const ob = object;