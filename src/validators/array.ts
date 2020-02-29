import { consecutive } from '../grouping-substitution/consecutive';
import { V_ARR } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, isArray, isValidatorsSequence, setMetaPath, setMetaValidator, toArray, validatorParamsError } from '../utilities';

/**
 * Type: semi validator, semi processor. Checks value to be an array.
 * 
 * @param {(Array<Processor> | Processor)=} itemSpec Validator(s) of array elements. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'itemSpec' is invalid.
 */
export const array = <T, R>(itemSpec?: Array<Processor<T, R>> | Processor<T, R>, error?: Error): Processor<Array<T>, Array<R>> => {
  const validators = toArray(itemSpec);

  const isValidSequence = isValidatorsSequence(validators);

  if (!itemSpec || isValidSequence) {
    const validator = isValidSequence && consecutive<any>(...validators);

    return (
      (data: Array<T>, onError?: ErrorCallback, meta?: MetaData): Array<R> =>
        isArray(data)
          ? (
            validator
              ? data.map((value, index) => validator(value, onError, setMetaPath(meta, index)))
              : data
          )
          : applyError(error, onError, setMetaValidator(meta, V_ARR, [data]))
    );
  } else {
    return validatorParamsError(V_ARR);
  }
};