/**
 * @name {Validator}
 * 
 * @desc Validates value.
 *
 * @param {any} value Input value.
 * 
 * @param {ErrorCallback=} onError ErrorCallback.
 * 
 * @param {MetaData=} meta Internal data for errors and dependencies.
 * 
 * @return {any} Validated value or null.
 */

//#example
type Validator<T> = (value: T, onError?: ErrorCallback, meta?: MetaData) => T;