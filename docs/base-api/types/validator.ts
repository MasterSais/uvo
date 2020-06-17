/**
 * @name {Validator}
 * 
 * @desc Validates value.
 *
 * @param {any} value Input value.
 * 
 * @param {ErrorCallback=} onError ValidatorErrorCallback.
 * 
 * @param {MetaData=} meta Internal data for errors and dependencies.
 * 
 * @return {any} Validated value or null.
 */

//#example
type Validator<T> = (value: T, onError?: ValidatorErrorCallback, meta?: MetaData) => T;