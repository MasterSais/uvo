import { consecutive } from '../grouping-substitution/consecutive';
import { V_OBJ } from '../names';
import { Error, ErrorCallback, MetaData, ObjectLike, ObjectRecords, Processor } from '../types';
import { applyError, isObject, isValidatorsSequence, setMetaPath, setMetaValidator, toArray, validatorParamsError } from '../utilities';

/**
 * Type: semi validator, semi processor. Checks value to be an object.
 * 
 * @param {ObjectRecords=} spec Validators scheme for object. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export const object = <T extends ObjectLike, R extends ObjectLike>(spec?: ObjectRecords, error?: Error): Processor<T, R> => {
  const specList: Array<[string, Array<Processor<any, any>>]> = [];

  const isSpecObject = isObject(spec);

  isSpecObject && (
    Object
      .keys(spec)
      .forEach((key) => specList.push([key, toArray(spec[key])]))
  );

  const isSpecValid = isSpecObject && specList.reduce(
    (result: boolean, [_, validators]) => result && isValidatorsSequence(validators), true
  );

  if (isSpecValid || !spec) {
    const validators: Array<[string, Processor<any, any>]> =
      spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);

    return (data: T, onError?: ErrorCallback, meta?: MetaData): R =>
      (isObject(data) && data !== null)
        ? (
          validators
            ? validators.reduce((result: R, [key, validator]) => (
              result[key as keyof R] = validator(data[key], onError, setMetaPath(meta, key)), result), {} as R
            )
            : data as unknown as R
        )
        : applyError(error, onError, setMetaValidator(meta, V_OBJ, [spec]));
  } else {
    return validatorParamsError(V_OBJ);
  }
};