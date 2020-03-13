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
 * {@link docs/types/meta-data}
 */
export declare type MetaData = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  _deps: ObjectLike;
};

/**
 * {@link docs/types/error}
 */
export declare type Error = string | boolean | number | Record<any, any> | Array<any> | ((meta: MetaData) => any);

/**
 * {@link docs/types/relevance}
 */
export declare type Relevance = {
  value: boolean;
};

/**
 * {@link docs/types/error-callback}
 */
export declare type ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) => void;

/**
 * {@link docs/types/result}
 */
export declare type Result<T> = {
  result: T;
  errors?: Array<any>;
};

/**
 * {@link docs/types/validator}
 */
export declare type Validator<T, R = T> = (value: T, onError?: ErrorCallback, meta?: MetaData) => R;

/**
 * Function with invertible supplement.
 */
export declare type Invertible<T> = T & { not: T };

/**
 * Function with checkable supplement.
 */
export declare type Checkable<T, R> = T & { check: R };

/**
 * {@link docs/types/fields-spec}
 */
export declare type FieldsSpec = string | [('&' | '|' | '^'), FieldsSpec | string, FieldsSpec | string, ...Array<FieldsSpec | string>];

/**
 * {@link docs/types/object-spec}
 */
export declare type ObjectSpec = Record<string, Array<Validator<any, any>> | Validator<any, any>>;