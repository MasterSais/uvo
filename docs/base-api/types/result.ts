/**
 * @name {Result}
 * 
 * @desc 'WithError' container's result. Will be null if no errors.
 * 
 * @typedef {Object} Result
 * 
 * @property {any} result - Validation result.
 * 
 * @property {Array} errors - Errors list.
 */

//#example
type Result<T> = {
  result: T;
  errors?: Array<any>;
};