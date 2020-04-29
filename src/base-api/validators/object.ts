import { V_OBJ } from '@lib/base-api/names';
import { Error, ErrorCallback, MetaData, ObjectLike, ObjectSpec, Validator } from '@lib/base-api/types';
import { makeSequence } from '@lib/base-api/utilities/factories';
import { isObject, toArray } from '@lib/base-api/utilities/types';
import { applyError, asyncActor, extendMeta, setMetaPath, throwValidatorError } from '@lib/base-api/utilities/utilities';

const mapObjectValidators = (spec?: ObjectSpec): Array<[string, Validator<any, any>]> => (
  isObject(spec)
    ? Object.keys(spec).map((key) => [key, makeSequence(toArray(spec[key]))])
    : spec && throwValidatorError(V_OBJ)
);

/**
 * {@link docs/base-api/validators/object}
 */
export const object = <T extends ObjectLike, R = T>(spec?: ObjectSpec, error?: Error): Validator<T, R> => {
  const validators: Array<[string, Validator<any, any>]> = mapObjectValidators(spec);

  return (data: T, onError?: ErrorCallback, meta?: MetaData): R => {
    const [actAsync, proceedAsync] = asyncActor();

    extendMeta(meta, data, V_OBJ);

    return isObject(data)
      ? (
        validators
          ? (
            proceedAsync(
              validators.reduce((result: R, [key, validator]) => (
                actAsync(
                  validator(data[key], onError, setMetaPath(meta, key)),
                  (value: any) => result[key as keyof R] = value
                ),
                result
              ), {} as R)
            )
          )
          : data as unknown as R
      )
      : applyError(error, onError, meta);
  };
};