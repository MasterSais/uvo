import { isArray } from 'util';
import { consecutive } from '../grouping-substitution/consecutive';
import { V_OBJ } from '../names';
import { Error, ErrorCallback, MetaData, ObjectLike, Processor } from '../types';
import { applyError, isObject, isValidatorsSequence, setMetaPath, setMetaValidator, toArray, validatorParamsError } from '../utilities';

const isNestedArrays = (value: Array<Array<any>>) => isArray(value) && (
  value.reduce((result, item) => result && isArray(item), true)
);

/**
 * Checks value to be an object.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 * 
 * @param {Array=} spec Validators scheme for object in form of array. Provides strict ordering. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export const object2 = <T extends ObjectLike, R extends ObjectLike>(spec?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R> => {
  const specList: Array<[string, Array<Processor<any, any>>]> = [];

  const isSpecArray = isNestedArrays(spec);

  isSpecArray && (
    spec.forEach(([key, ...validators]) => specList.push([key, toArray(validators)]))
  );

  const isSpecValid = isSpecArray && specList.reduce(
    (result: boolean, [key, validators]) => result && isValidatorsSequence(validators) && key.length > 0, true
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
    return validatorParamsError(V_OBJ);
  }
};