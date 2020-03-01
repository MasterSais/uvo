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
export declare const V_INT: string;
/** @type {string} */
export declare const V_EQ: string;
/** @type {string} */
export declare const V_REG: string;
/** @type {string} */
export declare const V_NEQ: string;
/** @type {string} */
export declare const V_GTE: string;
/** @type {string} */
export declare const V_LTE: string;
/** @type {string} */
export declare const V_OOF: string;
/** @type {string} */
export declare const V_LEN: string;
/** @type {string} */
export declare const V_MXLEN: string;
/** @type {string} */
export declare const V_MNLEN: string;
/** @type {string} */
export declare const V_FIELDS: string;
/** @type {string} */
export declare const V_NUM: string;
/** @type {string} */
export declare const V_STR: string;
/** @type {string} */
export declare const V_BLN: string;
/** @type {string} */
export declare const V_ARR: string;
/** @type {string} */
export declare const V_OBJ: string;
export declare const consecutive: <T>(...validators: Validator<T>[]) => Validator<T>;
export declare const getDep: <T>(field: string, preValidator: (dep: T) => Validator<T> | Validator<T>[]) => Validator<T>;
export declare const mergeDep: <T>(field: string) => Validator<T>;
export declare const or: (...validators: Processor<any, any>[]) => Processor<any, any>;
export declare const parallel: <T>(...validators: Validator<T>[]) => Validator<T>;
export declare const setDep: <T>(field: string) => Validator<T>;
export declare const setVDep: <T>(field: string, ...validators: Validator<T>[]) => Validator<T>;
export declare const transform: <T, R>(...transformers: Processor<T | R, T | R>[]) => Processor<T | R, T | R>;
export declare const useDefault: <T extends unknown>(defaultValue: T, ...validators: Processor<any, any>[]) => Processor<any, any>;
/**
 * Type: semi validator, semi processor. Checks value to be an array.
 *
 * @param {(Array<Processor> | Processor)=} itemSpec Validator(s) of array elements.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'itemSpec' is invalid.
 */
export declare const array: <T, R>(itemSpec?: Processor<T, R> | Processor<T, R>[], error?: Error) => Processor<T[], R[]>;
/**
 * Type: semi validator, semi processor. Checks value to be a boolean compatible.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export declare const bool: <T>(error?: Error) => Processor<T, boolean>;
/**
 * Type: validator. Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.
 *
 * @param {any} match Match.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export declare const equal: <T>(match: T, error?: Error) => Validator<T>;
/**
 * Type: validator. Checks for fields in the input object.
 *
 * @param {Array|string} spec Fields specification.
 * If array, the first element represents a logical operation, otherwise a name of single field.
 * Operations: OR - '|', AND - '&', XOR - '^'.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export declare const fields: <T extends ObjectLike>(spec: Fields, error?: Error) => Validator<T>;
/**
 * Type: validator. Checks value to be greater or equal to 'match' param. Requires the same type.
 *
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'bound' is invalid.
 */
export declare const gte: <T>(bound: T, error?: Error) => Validator<T>;
/**
 * Type: validator. Checks number to be an integer.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export declare const integer: (error?: Error) => Validator<number>;
/**
 * Type: validator. Checks length to be equal to 'len' param. Requires to be object like.
 *
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export declare const len: <T extends Lengthy>(len: number, error?: Error) => Validator<T>;
/**
 * Type: validator. Checks value to be lower or equal to 'match' param. Requires the same type.
 *
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'bound' is invalid.
 */
export declare const lte: <T>(bound: T, error?: Error) => Validator<T>;
/**
 * Type: validator. Checks length to be equal to 'len' param. Requires to be object like.
 *
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export declare const maxLen: <T extends Lengthy>(len: number, error?: Error) => Validator<T>;
/**
 * Type: validator. Checks length to be equal to 'len' param. Requires to be object like.
 *
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export declare const minLen: <T extends Lengthy>(len: number, error?: Error) => Validator<T>;
/**
 * Type: validator. Checks value to be not equal to 'match' param. Requires the same type. Shallow comparison.
 *
 * @param {any} match Match.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export declare const notEqual: <T>(match: T, error?: Error) => Validator<T>;
/**
 * Type: semi validator, semi processor. Checks value to be a number compatible.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export declare const number: <T extends unknown>(error?: Error) => Processor<T, number>;
/**
 * Type: semi validator, semi processor. Checks value to be an object.
 *
 * @param {ObjectRecords=} spec Validators scheme for object.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export declare const object: <T extends ObjectLike, R extends ObjectLike>(spec?: Record<string, Processor<any, any> | Processor<any, any>[]>, error?: Error) => Processor<T, R>;
/**
 * Type: semi validator, semi processor. Checks value to be an object.
 *
 * @param {Array=} spec Validators scheme for object in form of array. Provides strict ordering.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export declare const object2: <T extends ObjectLike, R extends ObjectLike>(spec?: [string, ...Processor<any, any>[]][], error?: Error) => Processor<T, R>;
/**
 * Type: validator. Checks value to be one of expected. Shallow comparison.
 *
 * @param {Array} candidates List of possible expected values.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'candidates' is invalid.
 */
export declare const oneOf: <T>(candidates: T[], error?: Error) => Validator<T>;
/**
 * Type: validator. Checks value to match a pattern.
 *
 * @param {RegExp} match Pattern.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'match' is invalid.
 */
export declare const regex: <T extends unknown>(match: RegExp, error?: Error) => Validator<T>;
/**
 * Type: semi validator, semi processor. Checks value to be a string compatible.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export declare const string: <T>(error?: Error) => Processor<T, string>;
export declare const clamp: (min: number, max: number) => Processor<number, number>;
export declare const withErrors: <T, R>(validator: Processor<T, R>, commonErrorProcessor?: (meta?: MetaData) => Error) => Processor<T, Result<R>>;
export declare const withMeta: <T, R>(validator: Processor<T, R>) => Processor<T, R>;
export declare const withPromise: <T, R>(validator: Processor<T, Result<R>>) => Processor<T, Promise<R | Error[]>>;
