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
/** @type {string} */
export declare const G_CONS: string;
/** @type {string} */
export declare const G_PRLL: string;
/** @type {string} */
export declare const G_OR: string;
/** @type {string} */
export declare const G_TRM: string;
/** @type {string} */
export declare const S_GDP: string;
/** @type {string} */
export declare const S_SDP: string;
/** @type {string} */
export declare const S_SVDP: string;
/** @type {string} */
export declare const S_DFT: string;
/** @type {string} */
export declare const C_ERR: string;
/** @type {string} */
export declare const C_MET: string;
/** @type {string} */
export declare const C_PRM: string;
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
export declare const consecutive: <T, R>(...validators: Processor<T | R, R>[]) => Processor<T | R, R>;
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
export declare const or: <T>(...validators: Processor<T, unknown>[]) => Processor<T, unknown>;
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
export declare const parallel: <T>(...validators: Validator<T>[]) => Validator<T>;
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
export declare const transform: <T, R>(...processors: Processor<T | R, R>[]) => Processor<T | R, R>;
/**
 * Takes value from spreaded structure.
 * Might be used for dynamic validators creation.
 * If 'preValidator' not provided, just replaces current value.
 *
 * Type: spreader. Spreads data through a validators scheme.
 *
 * @param {string} field Spreaded value name.
 * @param {Function} preValidator Function that takes spreaded value and insert new validators into scheme.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'field' is invalid.
 */
export declare const getDep: <T>(field: string, preValidator?: (dep: T) => Validator<T> | Validator<T>[]) => Validator<T>;
/**
 * Puts value into spreaded structure.
 * If 'extValue' is provided, puts it instead of current value.
 *
 * Type: spreader. Spreads data through a validators scheme.
 *
 * @param {string} field Spreaded value name.
 * @param {any} extValue External value or function that returns it.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'field' is invalid.
 */
export declare const setDep: <T>(field: string, extValue?: T | (() => T)) => Validator<T>;
/**
 * Puts validators into spreaded structure.
 * Might be used for recursive schemes.
 *
 * Type: spreader. Spreads data through a validators scheme.
 *
 * @param {string} field Spreaded value name.
 * @param {..Validator} validators Validators to save.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'field' or 'validators' is invalid.
 */
export declare const setVDep: <T>(field: string, ...validators: Validator<T>[]) => Validator<T>;
/**
 * Puts default value into spreaded structure.
 * If input value is empty, puts default value instead, otherwise validates input values with provided validators.
 *
 * Type: spreader. Spreads data through a validators scheme.
 *
 * @param {any} defaultValue Default value.
 * @param {...Processor} validators Validators for input value.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validators' is invalid.
 */
export declare const useDefault: <T, R>(defaultValue: R | (() => R), ...validators: Processor<T | R, R>[]) => Processor<T | R, R>;
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
export declare const array: <T, R>(itemSpec?: Processor<T | R, R> | Processor<T | R, R>[], error?: Error) => Processor<(T | R)[], R[]>;
/**
 * Checks value to be a boolean compatible.
 *
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export declare const bool: <T>(error?: Error) => Processor<T, boolean>;
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
export declare const equal: <T>(match: T, error?: Error) => Validator<T>;
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
export declare const fields: <T extends ObjectLike>(spec: Fields, error?: Error) => Validator<T>;
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
export declare const gte: <T>(bound: T, error?: Error) => Validator<T>;
/**
 * Checks number to be an integer.
 *
 * Type: validator. If validation is successful, then returns input value.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export declare const integer: (error?: Error) => Validator<number>;
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
export declare const len: <T extends Lengthy>(len: number, error?: Error) => Validator<T>;
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
export declare const lte: <T>(bound: T, error?: Error) => Validator<T>;
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
export declare const maxLen: <T extends Lengthy>(len: number, error?: Error) => Validator<T>;
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
export declare const minLen: <T extends Lengthy>(len: number, error?: Error) => Validator<T>;
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
export declare const notEqual: <T>(match: T, error?: Error) => Validator<T>;
/**
 * Checks value to be a number compatible.
 *
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export declare const number: <T extends unknown>(error?: Error) => Processor<T, number>;
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
export declare const object: <T extends ObjectLike, R extends ObjectLike>(spec?: Record<string, Processor<any, any> | Processor<any, any>[]>, error?: Error) => Processor<T, R>;
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
export declare const object2: <T extends ObjectLike, R extends ObjectLike>(spec?: [string, ...Processor<any, any>[]][], error?: Error) => Processor<T, R>;
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
export declare const oneOf: <T>(candidates: T[], error?: Error) => Validator<T>;
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
export declare const regex: <T extends unknown>(match: RegExp, error?: Error) => Validator<T>;
/**
 * Checks value to be a string compatible.
 *
 * Type: semi validator, semi processor. If validation is successful, then converts value to proper type.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export declare const string: <T>(error?: Error) => Processor<T, string>;
/**
 * Clamps value to required boundaries.
 *
 * Type: processor. Processors do not check params' and values' types. Escape usage without validators.
 *
 * @param {number|string|boolean} min Left bound to clamp to.
 * @param {number|string|boolean} max Right bound to clamp to.
 * @return {Processor} Function that takes value.
 */
export declare const clamp: <T>(min: T, max: T) => Processor<T, T>;
/**
 * Provides error handling mechanism.
 *
 * Type: container. Embraces validator. Provides additional processing.
 *
 * @param {Processor} validator Validator.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validator' is invalid.
 */
export declare const withErrors: <T, R>(validator: Processor<T, R>, commonErrorProcessor?: (meta?: MetaData) => Error) => Processor<T, Result<R>>;
/**
 * Provides meta structure.
 *
 * Type: container. Embraces validator. Provides additional processing.
 *
 * @param {Processor} validator Validator.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validator' is invalid.
 */
export declare const withMeta: <T, R>(validator: Processor<T, R>) => Processor<T, R>;
/**
 * Convert result to promise.
 *
 * Type: container. Embraces validator. Provides additional processing.
 *
 * @param {Processor} validator Validator.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'validator' is invalid.
 */
export declare const withPromise: <T, R>(validator: Processor<T, R | Result<R>>) => Processor<T, Promise<R | Error[]>>;
