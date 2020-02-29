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