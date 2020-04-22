import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { V_OBJ } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, ObjectLike, ObjectSpec, Validator } from '@lib/classic-api/types';
import { isObject, toArray } from '@lib/classic-api/utilities/types';
import { applyError, asyncActor, extendMeta, setMetaPath, throwValidatorError } from '@lib/classic-api/utilities/utilities';

const mapObjectValidators = (spec?: ObjectSpec): Array<[string, Validator<any, any>]> => (
  isObject(spec)
    ? Object.keys(spec).map((key) => [key, consecutive(...toArray(spec[key]))])
    : spec && throwValidatorError(V_OBJ)
);

/**
 * {@link docs/classic-api/validators/object}
 */
export const object = <T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R> => {
  const validators: Array<[string, Validator<any, any>]> = mapObjectValidators(spec);

  return (data: T, onError?: ErrorCallback, meta?: MetaData): R => {
    const [actAsync, proceedAsync] = asyncActor(meta);

    extendMeta(meta, data, V_OBJ);

    return isObject(data)
      ? (
        validators
          ? proceedAsync(
            validators.reduce((result: R, [key, validator]) => (
              actAsync(
                validator(data[key], onError, setMetaPath(meta, key)),
                (value: any) => result[key as keyof R] = value
              ),
              result
            ), {} as R)
          )
          : data as unknown as R
      )
      : applyError(error, onError, meta);
  };
};