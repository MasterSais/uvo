/**
 * @name {object2<T extends ObjectLike, R extends ObjectLike>(spec?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R>}
 * 
 * @desc Checks value to be an object.
 * 
 * {@link docs/type-validator-processor}
 * 
 * @param {Array=} spec Validators scheme for object in form of array. Provides strict ordering. 
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/processor-result}
 * 
 * @throws {string} Will throw an error if 'spec' is invalid.
 */