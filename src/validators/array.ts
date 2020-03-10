import { consecutive } from '../groupers/consecutive';
import { V_ARR } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isArray, isValidatorsSequence, setMetaPath, setMetaValidator, throwValidatorError, toArray } from '../utilities';

/**
 * {@link docs/validators/array}
 */
export const array = <T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, error?: Error): Validator<Array<any>, Array<T>> => {
  const validators = toArray(itemSpec);

  const isValidSequence = isValidatorsSequence(validators);

  if (!itemSpec || isValidSequence) {
    const validator = isValidSequence && consecutive(...validators);

    return (
      (data: Array<any>, onError?: ErrorCallback, meta?: MetaData): Array<T> =>
        isArray(data)
          ? (
            validator
              ? data.map((value, index) => validator(value, onError, setMetaPath(meta, index)))
              : data
          )
          : applyError(error, onError, setMetaValidator(meta, V_ARR, [data]))
    );
  } else {
    return throwValidatorError(V_ARR);
  }
};