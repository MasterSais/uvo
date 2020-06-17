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
 * @return {void}
 */

//#example
type ValidatorErrorCallback = (error: ValidatorError, meta?: MetaData, relevance?: Relevance) => void;