/**
 * @name {Error}
 * 
 * @desc Any type's error. 
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * 
 * @typedef {string | number | Object | Array | Function} Error
 */

//#example
type ValidatorError = (
  string
  | boolean
  | number
  | Record<any, any>
  | Array<any>
  | ((meta: MetaData) => any)
);