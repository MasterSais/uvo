import { consecutive } from '../groupers/consecutive';
import { V_ARR } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, isArray, isValidatorsSequence, setMetaPath, setMetaValidator, toArray, throwValidatorError } from '../utilities';

/**
 * Checks value to be an array.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 * 
 * @param {Array=} itemSpec Validator(s) of array elements. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'itemSpec' is invalid.
 */
export const array = <T, R>(itemSpec?: Array<Processor<T | R, R>> | Processor<T | R, R>, error?: Error): Processor<Array<T | R>, Array<R>> => {
  const validators = toArray(itemSpec);

  const isValidSequence = isValidatorsSequence(validators);

  if (!itemSpec || isValidSequence) {
    const validator = isValidSequence && consecutive(...validators);

    return (
      (data: Array<T | R>, onError?: ErrorCallback, meta?: MetaData): Array<R> =>
        isArray(data)
          ? (
            validator
              ? data.map((value, index) => validator(value, onError, setMetaPath(meta, index)))
              : data
          ) as Array<R>
          : applyError(error, onError, setMetaValidator(meta, V_ARR, [data]))
    );
  } else {
    return throwValidatorError(V_ARR);
  }
};

/**
 * @borrows arr as array
 */
export const arr = array;