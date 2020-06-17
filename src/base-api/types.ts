/** @typedef {Object} ObjectLike */
export declare type ObjectLike = {
  [name: string]: any;
};

/**
 * Lengthy interface.
 * @typedef {Object} Lengthy
 * @property {number} length
 */
export declare type Lengthy = {
  length: number;
};

/**
 * {@link docs/base-api/types/meta-data}
 */
export declare type MetaData = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  _deps: ObjectLike;
  _logs: Array<[string, any, Array<any>]>;
  _asyncStack?: ObjectLike;
};

/**
 * {@link docs/base-api/types/error}
 */
export declare type ValidatorError = string | boolean | number | Record<any, any> | Array<any> | ((meta: MetaData, internalError?: any) => any);

/**
 * {@link docs/base-api/types/relevance}
 */
export declare type Relevance = {
  value: boolean;
};

/**
 * {@link docs/base-api/types/error-callback}
 */
export declare type ValidatorErrorCallback = (error: ValidatorError, meta?: MetaData, relevance?: Relevance) => void;

/**
 * {@link docs/base-api/types/result}
 */
export declare type Result<T> = {
  result: T;
  errors?: Array<any>;
};

/**
 * {@link docs/base-api/types/validator}
 */
export declare type Validator<T, R = T> = (value: T, onError?: ValidatorErrorCallback, meta?: MetaData) => R;

/**
 * Function with invertible supplement.
 */
export declare type Invertible<T> = T & { not: T };

/**
 * Async validator.
 */
export declare type Async<T> = T & { async: boolean };

/**
 * All primitive types.
 */
export declare type Primitive = string | number | boolean;

/**
 * {@link docs/base-api/types/fields-spec}
 */
export declare type FieldsSpec = string | [('&' | '|' | '^'), FieldsSpec | string, FieldsSpec | string, ...Array<FieldsSpec | string>];

/**
 * {@link docs/base-api/types/object-spec}
 */
export declare type ObjectSpec = Record<string, Array<Validator<any, any>> | Validator<any, any>>;