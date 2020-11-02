/**
 * @name {ErrorCallback}
 * 
 * @desc Calls on validation error.
 *
 * @param {Error} error Any type's error.
 * 
 * @param {MetaData=} meta Metadata for error.
 * 
 * @param {Relevance=} relevance ValidatorError's relevancy status.
 * 
 * @return {ValidatorError}
 */

//#example
type ErrorCallback = (error: ValidatorError, meta?: MetaData, relevance?: Relevance) => ValidatorError;