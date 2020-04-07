import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { V_OBJ } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, ObjectLike, ObjectSpec, Validator } from '@lib/classic-api/types';
import { applyError, extendMeta, isObject, setMetaPath, throwValidatorError, toArray } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/object}
 */
export const object = <T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R> => {
  const specList: Array<[string, Array<Validator<any, any>>]> = [];

  const isSpecObject = isObject(spec);

  isSpecObject && (
    Object
      .keys(spec)
      .forEach((key) => specList.push([key, toArray(spec[key])]))
  );

  spec && !isSpecObject && throwValidatorError(V_OBJ);

  const validators: Array<[string, Validator<any, any>]> =
    spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);

  return (data: T, onError?: ErrorCallback, meta?: MetaData): R =>
    (
      extendMeta(meta, data, V_OBJ),

      isObject(data)
        ? (
          validators
            ? validators.reduce((result: R, [key, validator]) => (
              result[key as keyof R] = validator(data[key], onError, setMetaPath(meta, key)), result), {} as R
            )
            : data as unknown as R
        )
        : applyError(error, onError, meta)
    );
};