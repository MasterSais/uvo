import { Checkable, Error, ErrorCallback, Invertible, Lengthy, MetaData, Validator } from './types';

export const toArray = <T>(params?: Array<T> | T): Array<T> =>
  Array.isArray(params) ? params : [params];

export const setMetaPath = (meta: MetaData, path: string | number): MetaData => (meta && {
  ...meta,
  path: meta.path.concat(path ? [path] : [])
});

export const setMetaValidator = (meta: MetaData, validator: string, params: Array<any> = []): MetaData => (meta && {
  ...meta, params, validator
});

export const postToMeta = <T>(value: T, field: string, meta: MetaData): T => (
  meta
    ? (meta._deps[field] = value)
    : value
);

export const getFromMeta = <T>(field: string, meta: MetaData): T => (
  meta ? meta._deps[field] : null
);

export const applyError = (error: Error, onError: ErrorCallback, meta: MetaData): null =>
  (onError && onError(error, meta), null);

export const throwValidatorError = (validator: string) => {
  throw `Invalid params provided in '${validator}'`;
};

export const reduceValidators = (value: any, onError: ErrorCallback, meta: MetaData, validators: Array<Validator<any>>): any =>
  validators.reduce((value: any, nextValidator: Validator<any>): any =>
    (value !== null ? nextValidator(value, onError, meta) : null), value);

export const valueOf = (value: any) => (value !== null && value !== undefined) ? value.valueOf() : value;

export const isEmpty = (value: any) => (value === null) || (value === undefined) || (value === '');

export const isOneType = (a: any, b: any): boolean => typeof a === typeof b;

export const isDefined = (value: any): boolean => value !== undefined;

export const isFinite = (value: any): boolean => (global || window).isFinite(value);

export const isFiniteNumber = (value: any): boolean => Number.isFinite(value);

export const isNumber = (value: any): boolean => typeof value === 'number';

export const isRegEx = (value: any): boolean => value && value.constructor === RegExp;

export const isString = (value: any): boolean => typeof value === 'string';

export const isBoolean = (value: any): boolean => typeof value === 'boolean';

export const isFunction = (value: any): boolean => typeof value === 'function';

export const isObjectLike = (value: any): boolean => typeof value === 'object';

export const isObject = (value: any): boolean => value && typeof value === 'object' && value.constructor === Object;

export const isArray = (value: any): boolean => Array.isArray(value);

export const isLengthy = <T extends Lengthy>(value: T) => value !== null && (isObjectLike(value) || isString(value)) && isFiniteNumber(value.length);

export const isValidatorsSequence = (validators: Array<Validator<any, any>>): boolean =>
  validators.reduce((result: boolean, validator) => result && isFunction(validator), true);

export const makeInvertible = <T>(factory: (invert: boolean) => T): Invertible<T> => {
  const validator = factory(false) as Invertible<T>;

  validator.not = factory(true);

  return validator;
};

export const makeCheckable = <T, R>(factory: (checkOnly: boolean) => T | R): Checkable<T, R> => {
  const validator = factory(false) as Checkable<T, R>;

  validator.check = factory(true) as R;

  return validator;
};

export const invertCondition = (condition: boolean, invert: boolean) => invert ? !condition : condition;

export const invertError = (name: string, invert: boolean) => invert ? `not:${name}` : name;

export const isFactory = (validator: string, params?: Array<any>) =>
  (
    <T>(comparator: ((value: T) => boolean), error?: Error): Validator<T> =>
      (
        isFunction(comparator)
          ? (
            (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
              comparator(value)
                ? value
                : applyError(error, onError, setMetaValidator(meta, validator, params || []))
          )
          : throwValidatorError(validator)
      )
  );

export const lengthFactory = (validator: string, comparator: ((value: number, len: number) => boolean)) => (
  (
    makeInvertible<(<T extends Lengthy>(len: number, error?: Error) => Validator<T>)>(
      (
        (invert: boolean) => <T extends Lengthy>(len: number, error?: Error) => isFactory(invertError(validator, invert), [len])(
          (
            (isFiniteNumber(len) && len >= 0)
              ? (
                (value: T) => invertCondition(isLengthy(value) && comparator(value.length, len), invert)
              )
              : throwValidatorError(invertError(validator, invert))
          ), error
        )
      )
    )
  )
);

export const multipleFactory = (validator: string) => (
  (
    makeInvertible<((multiplier: number, error?: Error) => Validator<number>)>(
      (
        (invert: boolean) => (multiplier: number, error?: Error): Validator<number> => isFactory(invertError(validator, invert), [multiplier])(
          (
            isNumber(multiplier)
              ? (
                (value: number) => invertCondition(isNumber(value) && value % multiplier === 0, invert)
              )
              : throwValidatorError(invertError(validator, invert))
          ), error
        )
      )
    )
  )
);