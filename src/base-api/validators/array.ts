import { V_ARR } from '@lib/base-api/names';
import { ValidatorError, ErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { makeSequence } from '@lib/base-api/utilities/factories';
import { isArray, isValidatorsSequence, toArray } from '@lib/base-api/utilities/types';
import { applyError, asyncActor, extendMeta, setMetaPath, throwValidatorError } from '@lib/base-api/utilities/utilities';

const mapArrayValidators = <T>(itemSpec?: Array<Validator<any, T>> | Validator<any, T>, validators?: Array<Validator<any>>) => (
  validators = toArray(itemSpec),

  isValidatorsSequence(validators)
    ? makeSequence(validators)
    : itemSpec && throwValidatorError(V_ARR)
);

/**
 * {@link docs/base-api/validators/array}
 */
export const array = (itemSpec?: Array<Validator<any>> | Validator<any>, error?: ValidatorError): Validator<Array<any>, Array<any>> => {
  const validator = mapArrayValidators(itemSpec);

  return (
    (data: Array<any>, onError?: ErrorCallback, meta?: MetaData): Array<any> => {
      const [actAsync, proceedAsync] = asyncActor();

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