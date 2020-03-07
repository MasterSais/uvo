/**
 * @name {Processor}
 * @desc Processes value.
 *
 * @param {any} value Input value.
 * @param {ErrorCallback=} onError ErrorCallback.
 * @param {MetaData=} meta Internal data for errors and dependencies.
 * @return {any} Validated value or null.
 */

//#example
type Processor<T, R> = (value: T, onError?: ErrorCallback, meta?: MetaData) => R;