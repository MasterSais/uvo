/**
 * @name {object<T extends ObjectLike, R extends ObjectLike>(spec?: ObjectRecords, error?: Error): Processor<T, R>}
 * 
 * @desc Checks value to be an object.
 * 
 * {@link docs/type-validator-processor}
 * 
 * @param {ObjectRecords=} spec Validators scheme for object.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/processor-result}
 * 
 * @throws {string} Will throw an error if 'spec' is invalid.
 */