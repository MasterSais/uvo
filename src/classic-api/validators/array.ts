import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { V_ARR } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { applyError, extendMeta, isArray, isValidatorsSequence, setMetaPath, throwValidatorError, toArray } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/array}
 */
export const array = <T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, error?: Error): Validator<Array<any>, Array<T>> => {
  const validators = toArray(itemSpec);

  const isValidSequence = isValidatorsSequence(validators);

  itemSpec && !isValidSequence && throwValidatorError(V_ARR);

  const validator = isValidSequence && consecutive(...validators);

  return (
    (data: Array<any>, onError?: ErrorCallback, meta?: MetaData): Array<T> =>
      (
        extendMeta(meta, data, V_ARR),

        isArray(data)
          ? (
            validator
              ? data.map((value, index) => validator(value, onError, setMetaPath(meta, index)))
              : data
          )
          : applyError(error, onError, meta)
      )
  );
};