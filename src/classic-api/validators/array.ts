import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { V_ARR } from '@lib/classic-api/names';
import { Error, ErrorCallback, MetaData, Validator } from '@lib/classic-api/types';
import { isArray, isValidatorsSequence, toArray } from '@lib/classic-api/utilities/types';
import { applyError, asyncActor, extendMeta, setMetaPath, throwValidatorError } from '@lib/classic-api/utilities/utilities';

const mapArrayValidators = <T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, validators?: Array<Validator<any>>) => (
  validators = toArray(itemSpec),

  isValidatorsSequence(validators)
    ? consecutive(...validators)
    : itemSpec && throwValidatorError(V_ARR)
);

/**
 * {@link docs/classic-api/validators/array}
 */
export const array = (itemSpec?: Array<Validator<any>> | Validator<any>, error?: Error): Validator<Array<any>, Array<any>> => {
  const validator = mapArrayValidators(itemSpec);

  return (
    (data: Array<any>, onError?: ErrorCallback, meta?: MetaData): Array<any> => {
      const [actAsync, proceedAsync] = asyncActor(meta);

      extendMeta(meta, data, V_ARR);

      return (
        isArray(data)
          ? (
            validator
              ? (
                data = data.slice(0),

                data.forEach((value, index) =>
                  actAsync(
                    validator(value, onError, setMetaPath(meta, index)),
                    (extValue: any) => data[index] = extValue
                  )
                ),

                proceedAsync(data)
              )
              : data
          )
          : applyError(error, onError, meta)
      );
    }
  );
};