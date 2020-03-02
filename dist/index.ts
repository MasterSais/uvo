/** @typedef {Object} ObjectLike */
export declare type ObjectLike = {
  [name: string]: any;
};

/**
 * Internal data for errors and dependencies.
 * @typedef {Object} MetaData
 * @property {boolean} path - Path to value.
 * @property {string=} validator - Validator code name.
 * @property {Array} params - Validator input params.
 * @property {ObjectLike} _deps - Internal dependencies storage.
 */
export declare type MetaData = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  _deps: ObjectLike;
};

/**
 * Any type's error. Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @typedef {string | number | Object | Array | Function} Error
 */
export declare type Error = string | number | Record<any, any> | Array<any> | ((meta: MetaData) => any);

/**
 * Error's relevancy status.
 * @typedef {Object} Relevance
 * @property {boolean} value - Value
 */
export declare type Relevance = {
  value: boolean;
};

/**
 * ErrorCallback.
 *
 * @param {Error} error Any type's error.
 * @param {MetaData=} meta Metadata for error.
 * @param {Relevance=} relevance Error's relevancy status.
 * @return {void}
 */
export declare type ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) => void;

/**
 * 'WithError' container result.
 * @typedef {Object} Result
 * @property {any} result - Validation result.
 * @property {Array} errors - Errors list.
 */
export declare type Result<T> = {
  result: T;
  errors?: Array<any>;
};

/**
 * Processor.
 *
 * @param {any} value Input value.
 * @param {ErrorCallback=} onError ErrorCallback.
 * @param {MetaData=} meta Internal data for errors and dependencies.
 * @return {any} Validated value or null.
 */
export declare type Processor<T, R> = (value: T, onError?: ErrorCallback, meta?: MetaData) => R;

/**
 * Validator.
 *
 * @param {any} value Input value.
 * @param {ErrorCallback=} onError ErrorCallback.
 * @param {MetaData=} meta Internal data for errors and dependencies.
 * @return {any} Validated value or null.
 */
export declare type Validator<T> = (value: T, onError?: ErrorCallback, meta?: MetaData) => T;

/** @type {Array | string} */
export declare type Fields = string | [('&' | '|' | '^'), ...Array<Fields | string>];

/** @type {Processor | Record<string, Array<Processor<any, any>>} */
export declare type ObjectRecords = Record<string, Array<Processor<any, any>> | Processor<any, any>>;

/**
 * Lengthy interface.
 * @typedef {Object} Lengthy
 * @property {number} length
 */
export declare type Lengthy = {
  length: number;
};

/** @type {string} */
export const V_INT: string = 'integer';

/** @type {string} */
export const V_EQ: string = 'equal';

/** @type {string} */
export const V_REG: string = 'regex';

/** @type {string} */
export const V_NEQ: string = 'notEqual';

/** @type {string} */
export const V_GTE: string = 'gte';

/** @type {string} */
export const V_LTE: string = 'lte';

/** @type {string} */
export const V_OOF: string = 'oneOf';

/** @type {string} */
export const V_LEN: string = 'len';

/** @type {string} */
export const V_MXLEN: string = 'maxLen';

/** @type {string} */
export const V_MNLEN: string = 'minLen';

/** @type {string} */
export const V_FIELDS: string = 'fields';

/** @type {string} */
export const V_NUM: string = 'number';

/** @type {string} */
export const V_STR: string = 'string';

/** @type {string} */
export const V_BLN: string = 'bool';

/** @type {string} */
export const V_ARR: string = 'array';

/** @type {string} */
export const V_OBJ: string = 'object';

/** @type {string} */
export const G_CONS: string = 'consecutive';

/** @type {string} */
export const G_PRLL: string = 'parallel';

/** @type {string} */
export const G_OR: string = 'or';

/** @type {string} */
export const G_TRM: string = 'transform';

/** @type {string} */
export const S_GDP: string = 'getDep';

const toArray = <T>(params?: Array<T> | T): Array<T> =>
  Array.isArray(params) ? params : [params];

const setMetaPath = (meta: MetaData, path: string | number): MetaData => (meta && {
  ...meta,
  path: meta.path.concat(path ? [path] : [])
});

const setMetaValidator = (meta: MetaData, validator: string, params: Array<any> = []): MetaData => (meta && {
  ...meta, params, validator
});

const postToMeta = <T>(value: T, field: string, meta: MetaData): T => (
  meta
    ? (meta._deps[field] = value)
    : value
);

const getFromMeta = <T>(field: string, meta: MetaData): T => (
  meta && meta._deps[field] || null
);

const applyError = (error: Error, onError: ErrorCallback, meta: MetaData): null =>
  (onError && onError(error, meta), null);

const throwValidatorError = (validator: string) => {
  throw validator;
};

const isEmpty = (value: any) => (value === null) || (value === undefined) || (value === '');

const isOneType = (a: any, b: any): boolean => typeof a === typeof b;

const isDefined = (value: any): boolean => value !== undefined;

const isFinite = (value: any): boolean => (global || window).isFinite(value);

const isFiniteNumber = (value: any): boolean => Number.isFinite(value);

const isNumber = (value: any): boolean => typeof value === 'number';

const isString = (value: any): boolean => typeof value === 'string';

const isBoolean = (value: any): boolean => typeof value === 'boolean';

const isFunction = (value: any): boolean => typeof value === 'function';

const isObjectLike = (value: any): boolean => typeof value === 'object';

const isObject = (value: any): boolean => value && typeof value === 'object' && value.constructor === Object;

const isArray = (value: any): boolean => Array.isArray(value);

const isValidatorsSequence = (validators: Array<Processor<any, any>>): boolean =>
  validators.reduce((result: boolean, validator) => result && isFunction(validator), true);

/**
 * Groups validators sequentially.
 * Passes value through a sequence of validators until an error occurs.
 * Uses by default in 'object' validator's scheme for fields.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Processor} validators Validators list.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const consecutive = <T, R>(...validators: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: T | R, onError?: ErrorCallback, meta?: MetaData): R =>
          validators.reduce((value: any, nextValidator: Processor<T | R, R>) =>
            (value !== null ? nextValidator(value, onError, meta) : null), value) as R
      )
      : throwValidatorError(G_CONS)
  );

/**
 * Groups validators sequentially.
 * Searches for first successful validator's result.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Processor} validators Validators list.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const or = <T>(...validators: Array<Processor<T, unknown>>): Processor<T, unknown> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): unknown => {
          let processed = null;

          const relevance: Relevance = { value: false };

          validators.find((nextValidator: Processor<T, unknown>) =>
            (
              processed = nextValidator(value, onError ? (error: Error, meta?: MetaData) => onError(error, meta, relevance) : null, meta),
              processed !== null
            )
          );

          if (processed === null) {
            relevance.value = true;
          }

          return processed;
        }
      )
      : throwValidatorError(G_OR)
  );

/**
 * Groups validators in parallel.
 * The main goal is to catch all errors (pass value through a sequence of validators, even if an error occurred somewhere).
 * Beware of using processors inside.
 * 
 * Type: grouper. Groups validators into one.
 * 
 * @param {...Validator} validators Validators list.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export const parallel = <T>(...validators: Array<Validator<T>>): Validator<T> =>
  (
    isValidatorsSequence(validators)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          validators.reduce((validated: T, nextValidator: Validator<T>) =>
            (
              validated !== null
                ? nextValidator(value, onError, meta)
                : (nextValidator(value, onError, meta), null)
            ), value)
      )
      : throwValidatorError(G_PRLL)
  );

/**
 * Groups processors sequentially.
 * Passes value through a sequence of processors.
 * Takes only processors (doesn't check errors).
 * 
 * Type: grouper. Groups processors into one.
 * 
 * @param {...Processor} processors Processors list.
 * @return {Processor} Function that takes value.
 * @throws {string} Will throw an error if 'processors' is invalid.
 */
export const transform = <T, R>(...processors: Array<Processor<T | R, R>>): Processor<T | R, R> =>
  (
    isValidatorsSequence(processors)
      ? (
        (value: T | R): R =>
          processors.reduce((value, processor) => processor(value), value) as R
      )
      : throwValidatorError(G_TRM)
  );

/**
 * Takes value from spreaded structure.
 * Might be used for dynamic validators creation.
 * 
 * Type: spreader. Spreads data through a validators scheme.
 * 
 * @param {string} field Validators list.
 * @param {Function} preValidator Function that takes spreaded value and insert new validators into scheme.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'field' or 'preValidator' is invalid.
 */
export const getDep = <T>(field: string, preValidator: (dep: T) => Validator<T> | Array<Validator<T>>): Validator<T> =>
  (
    (isString(field) && field.length > 0 && isFunction(preValidator))
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T => {
          const validators = preValidator(getFromMeta(field, meta));

          if (!validators) return value;

          const validatorsList = toArray(validators);

          return isValidatorsSequence(validatorsList)
            ? (
              validatorsList.reduce((value: any, nextValidator: Validator<T>) =>
                (value !== null ? nextValidator(value, onError, meta) : null), value)
            )
            : throwValidatorError(S_GDP);
        }
      )
      : throwValidatorError(S_GDP)
  );

export const mergeDep = <T>(field: string): Validator<T> =>
  (_value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
    getFromMeta(field, meta);

export const setDep = <T>(field: string, extValue?: T): Validator<T> =>
  (value: T, _onError?: ErrorCallback, meta?: MetaData): T =>
    postToMeta(isDefined(extValue) ? extValue : value, field, meta);

export const setVDep = <T>(field: string, ...validators: Array<Validator<T>>): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (postToMeta(validators, field, meta), validators.reduce((value: any, nextValidator: Validator<T>) =>
      (value !== null ? nextValidator(value, onError, meta) : null), value));

export const useDefault = <T extends unknown>(defaultValue: T, ...validators: Array<Processor<any, any>>): Processor<any, any> =>
  (value: any, onError?: ErrorCallback, meta?: MetaData): any =>
    !isEmpty(value)
      ? validators.reduce((value: any, nextValidator: Validator<T>) =>
        (value !== null ? nextValidator(value, onError, meta) : null), value)
      : (
        isFunction(defaultValue)
          ? (defaultValue as Function)(meta)
          : defaultValue
      );

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

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

/**
 * Checks value to be a boolean compatible.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const bool = <T>(error?: Error): Processor<T, boolean> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): boolean => {
    const index: number = (
      possibleValues.indexOf(value as any)
    );

    return (
      index >= 0
        ? Boolean(index % 2)
        : applyError(error, onError, setMetaValidator(meta, V_BLN))
    );
  };

/**
 * Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {any} match Match. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const equal = <T>(match: T, error?: Error): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (
      value === match
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_EQ, [match]));

const fieldsMap = {
  op: <T extends ObjectLike>(value: T, names: Array<Fields | string>): number =>
    names.reduce((result: number, field) =>
      result + Number(isString(field) ? !isEmpty(value[field as string]) : fieldsMap[field[0]](value, field.slice(1))), 0),

  '&': <T extends ObjectLike>(value: T, names: Array<Fields | string>): boolean =>
    fieldsMap.op(value, names) === names.length,

  '|': <T extends ObjectLike>(value: T, names: Array<Fields | string>): boolean =>
    fieldsMap.op(value, names) > 0,

  '^': <T extends ObjectLike>(value: T, names: Array<Fields | string>): boolean =>
    fieldsMap.op(value, names) === 1
};

const isLogicalLexeme = (lexeme: string) => ['&', '|', '^'].indexOf(lexeme) >= 0;

const validateFieldsSpec = (spec: Fields): boolean =>
  (isString(spec) && spec.length > 0 && !isLogicalLexeme(spec as string))
  || (
    isArray(spec)
    && spec.length > 2
    && isLogicalLexeme(spec[0])
    && (spec as Array<Fields>)
      .reduce((result: boolean, field, index) => index === 0 || result && validateFieldsSpec(field), true)
  );

/**
 * Checks for fields in the input object.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {Array|string} spec Fields specification.
 * If array, the first element represents a logical operation, otherwise a name of single field.
 * Operations: OR - '|', AND - '&', XOR - '^'. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export const fields = <T extends ObjectLike>(spec: Fields, error?: Error): Validator<T> =>
  (
    validateFieldsSpec(spec)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            isObject(value)
            && (
              fieldsMap.op(value, [spec]) > 0
            )
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_FIELDS, [spec]))
      )
      : throwValidatorError(V_FIELDS)
  );

/**
 * Checks value to be greater or equal to 'match' param. Requires the same type.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'bound' is invalid.
 */
export const gte = <T>(bound: T, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            isOneType(value, bound)
            && value >= bound
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_GTE, [bound]))
      )
      : throwValidatorError(V_GTE)
  );

/**
 * Checks number to be an integer.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const integer = (error?: Error): Validator<number> =>
  (value: number, onError?: ErrorCallback, meta?: MetaData): number =>
    (
      isNumber(value)
      && value % 1 === 0
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_INT));

/**
 * Checks length to be equal to 'len' param. Requires to be object like.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export const len = <T extends Lengthy>(len: number, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(len) && len >= 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && (isObjectLike(value) || isString(value))
            && isFiniteNumber(value.length)
            && value.length === len
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_LEN, [len]))
      )
      : throwValidatorError(V_LEN)
  );

/**
 * Checks value to be lower or equal to 'match' param. Requires the same type.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'bound' is invalid.
 */
export const lte = <T>(bound: T, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            isOneType(value, bound)
            && value <= bound
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_LTE, [bound]))
      )
      : throwValidatorError(V_LTE)
  );

/**
 * Checks length to be equal to 'len' param. Requires to be object like.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export const maxLen = <T extends Lengthy>(len: number, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(len) && len >= 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && (isObjectLike(value) || isString(value))
            && isFiniteNumber(value.length)
            && value.length <= len
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_MXLEN, [len]))
      )
      : throwValidatorError(V_MXLEN)
  );

/**
 * Checks length to be equal to 'len' param. Requires to be object like.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export const minLen = <T extends Lengthy>(len: number, error?: Error): Validator<T> =>
  (
    (isFiniteNumber(len) && len >= 0)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && (isObjectLike(value) || isString(value))
            && isFiniteNumber(value.length)
            && value.length >= len
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_MNLEN, [len]))
      )
      : throwValidatorError(V_MNLEN)
  );

/**
 * Checks value to be not equal to 'match' param. Requires the same type. Shallow comparison.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {any} match Match. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const notEqual = <T>(match: T, error?: Error): Validator<T> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
    (
      value !== match
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_NEQ, [match]));

/**
 * Checks value to be a number compatible.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const number = <T extends unknown>(error?: Error): Processor<T, number> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
    (
      value !== null
      && value !== String()
      && !isArray(value)
      && isFinite(value)
    )
      ? Number(value) : applyError(error, onError, setMetaValidator(meta, V_NUM));

/**
 * Checks value to be an object.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
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

  if (isSpecObject || !spec) {
    const validators: Array<[string, Processor<any, any>]> =
      spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);

    return (data: T, onError?: ErrorCallback, meta?: MetaData): R =>
      (
        data !== null
        && isObject(data)
      )
        ? (
          validators
            ? validators.reduce((result: R, [key, validator]) => (
              result[key as keyof R] = validator(data[key], onError, setMetaPath(meta, key)), result), {} as R
            )
            : data as unknown as R
        )
        : applyError(error, onError, setMetaValidator(meta, V_OBJ, [spec]));
  } else {
    return throwValidatorError(V_OBJ);
  }
};

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
    (result: boolean, [key]) => result && key.length > 0, true
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
    return throwValidatorError(V_OBJ);
  }
};

/**
 * Checks value to be one of expected. Shallow comparison.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {Array} candidates List of possible expected values. 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'candidates' is invalid.
 */
export const oneOf = <T>(candidates: Array<T>, error?: Error): Validator<T> =>
  (
    isArray(candidates)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            value !== null
            && candidates.indexOf(value) >= 0
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_OOF, [candidates]))
      )
      : throwValidatorError(V_OOF)
  );

/**
 * Checks value to match a pattern.
 * 
 * Type: validator. If validation is successful, then returns input value.
 * 
 * @param {RegExp} match Pattern.
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'match' is invalid.
 */
export const regex = <T extends unknown>(match: RegExp, error?: Error): Validator<T> =>
  (
    (match && match.constructor === RegExp)
      ? (
        (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
          (
            match.test(value as string)
          )
            ? value : applyError(error, onError, setMetaValidator(meta, V_REG, [match]))
      )
      : throwValidatorError(V_REG)
  );

/**
 * Checks value to be a string compatible.
 * 
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 * 
 * @param {Error=} error (Optional) Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const string = <T>(error?: Error): Processor<T, string> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): string =>
    (
      isDefined(value)
      && !isObjectLike(value)
      && !isFunction(value)
    )
      ? String(value) : applyError(error, onError, setMetaValidator(meta, V_STR));

/**
 * Clamps value to required boundaries.
 * 
 * Type: processor. Processors do not check params' and values' types. Escape usage without validators.
 * 
 * @param {number|string|boolean} min Left bound to clamp to.
 * @param {number|string|boolean} max Right bound to clamp to.
 * @return {Processor} Function that takes value.
 */
export const clamp = <T extends (number | string | boolean)>(min: T, max: T): Processor<T, T> =>
  (value: T): T => value < min ? min : (value > max ? max : value);

export const withErrors = <T, R>(validator: Processor<T, R>, commonErrorProcessor?: ((meta?: MetaData) => Error)): Processor<T, Result<R>> =>
  (value: T, _onError?: ErrorCallback, meta?: MetaData): Result<R> => {
    const errors: Array<{ error: any; relevance: Relevance }> = [];

    const addError = (error: any, relevance?: Relevance) =>
      errors.push({ error, relevance: relevance || { value: true } });

    const errorProcessor: ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) =>
      error && (
        isFunction(error)
          ? addError((error as Function)(meta), relevance)
          : addError(error, relevance)
      ) || commonErrorProcessor && addError(commonErrorProcessor(meta), relevance);

    const result = validator(value, errorProcessor, meta);

    return {
      result,
      errors: errors.length > 0
        ? errors.filter(({ relevance }) => relevance.value).map(({ error }) => error)
        : null
    };
  };

export const withMeta = <T, R>(validator: Processor<T, R>): Processor<T, R> =>
  (value: T, onError?: ErrorCallback): R =>
    validator(value, onError, { path: [], _deps: {}, params: [] });

export const withPromise = <T, R>(validator: Processor<T, Result<R>>): Processor<T, Promise<R | Array<Error>>> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): Promise<R | Array<Error>> => new Promise((resolve, reject) => {
    const data = validator(value, onError, meta);

    data.errors ? reject(data.errors) : resolve(data.result || data as unknown as R);
  });