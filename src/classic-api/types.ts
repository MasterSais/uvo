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
 * {@link docs/classic-api/types/meta-data}
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
 * {@link docs/classic-api/types/error}
 */
export declare type Error = string | boolean | number | Record<any, any> | Array<any> | ((meta: MetaData) => any);

/**
 * {@link docs/classic-api/types/relevance}
 */
export declare type Relevance = {
  value: boolean;
};

/**
 * {@link docs/classic-api/types/error-callback}
 */
export declare type ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) => void;

/**
 * {@link docs/classic-api/types/result}
 */
export declare type Result<T> = {
  result: T;
  errors?: Array<any>;
};

/**
 * {@link docs/classic-api/types/validator}
 */
export declare type Validator<T, R = T> = (value: T, onError?: ErrorCallback, meta?: MetaData) => R;

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
 * Function with checkable supplement.
 */
export declare type Checkable<T, R> = T & { check: R };

/**
 * {@link docs/classic-api/types/fields-spec}
 */
export declare type FieldsSpec = string | [('&' | '|' | '^'), FieldsSpec | string, FieldsSpec | string, ...Array<FieldsSpec | string>];

/**
 * {@link docs/classic-api/types/object-spec}
 */
export declare type ObjectSpec = Record<string, Array<Validator<any, any>> | Validator<any, any>>;