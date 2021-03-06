import { Async, ValidatorError, ErrorCallback, Invertible, Lengthy, MetaData, Validator } from '@lib/base-api/types';
import { callee, isDefined, isFunction, isLengthy, isNumber } from '@lib/base-api/utilities/types';
import { applyError, extendMeta, passValidators, throwValidatorError } from '@lib/base-api/utilities/utilities';

export const invertCondition = (condition: boolean, invert: boolean) => invert ? !condition : condition;

export const invertError = (name: string, invert: boolean) => invert ? `not:${name}` : name;

export const makeAsync = <T>(validator: T): Async<T> => (
  (validator as any as Async<T>).async = true, validator as any as Async<T>
);

export const makeSequence = <T>(validators: Array<Validator<any>>) => (
  // Presume sequnce to be async.
  makeAsync(
    (value: any, onError?: ErrorCallback, meta?: MetaData): T =>
      passValidators(value, onError, meta, validators)
  )
);

export const makeInvertible = <T>(factory: (invert: boolean) => T): Invertible<T> => {
  const validator = factory(false) as Invertible<T>;

  validator.not = factory(true);

  return validator;
};

export const isFactory = (validator: string, param?: any) =>
  (
    <T>(comparator: ((value: T, ...args: any) => boolean), error?: ValidatorError): Validator<T> =>
      (
        isFunction(comparator)
          ? (
            param = callee(param),

            (value: T, onError?: ErrorCallback, meta?: MetaData): T => {
              const paramData = param();

              extendMeta(meta, value, validator, isDefined(paramData) ? [paramData] : []);

              return (
                comparator(value, paramData)
                  ? value
                  : applyError(error, onError, meta)
              );
            }
          )
          : throwValidatorError(validator)
      )
  );

export const lengthFactory = (validator: string, comparator: ((value: number, len: number) => boolean)) => (
  (
    makeInvertible<(<T extends Lengthy>(len: number | (() => number), error?: ValidatorError) => Validator<T>)>(
      (
        (invert: boolean) => <T extends Lengthy>(len: number | (() => number), error?: ValidatorError) => isFactory(invertError(validator, invert), len)(
          (value: T, param: number) => isLengthy(value) && invertCondition(comparator(value.length, param), invert),
          error
        )
      )
    )
  )
);

export const multipleFactory = (validator: string) => (
  (
    makeInvertible<((multiplier: number | (() => number), error?: ValidatorError) => Validator<number>)>(
      (
        (invert: boolean) => (multiplier: number | (() => number), error?: ValidatorError): Validator<number> => isFactory(invertError(validator, invert), multiplier)(
          (value: number, param: number) => isNumber(value) && invertCondition(value % param === 0, invert),
          error
        )
      )
    )
  )
);