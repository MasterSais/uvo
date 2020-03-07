/**
 * @name {ErrorCallback}
 * @desc Calls on validation error.
 *
 * @param {Error} error Any type's error.
 * @param {MetaData=} meta Metadata for error.
 * @param {Relevance=} relevance Error's relevancy status.
 * @return {void}
 */

//#example
type ErrorCallback = (error: Error, meta?: MetaData, relevance?: Relevance) => void;