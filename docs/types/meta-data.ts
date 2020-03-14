/**
 * @name {MetaData}
 * 
 * @desc Internal data for errors and dependencies.
 * 
 * @typedef {Object} MetaData
 * 
 * @property {boolean} path - Path to value.
 * 
 * @property {string=} validator - Validator code name.
 * 
 * @property {Array} params - Validator input params.
 * 
 * @property {ObjectLike} _deps - Internal dependencies storage.
 */

//#example
type MetaData = {
  path: Array<string | number>;
  validator?: string;
  params: Array<any>;
  _deps: Record<string, any>;
};