/**
 * @name {fields<T extends ObjectLike>(spec: Fields, error?: Error): Validator<T>}
 * 
 * @desc Checks for fields in the input object.
 * 
 * {@link docs/type-validator}
 * 
 * @param {Array|string} spec Fields specification.
 * If array, the first element represents a logical operation, otherwise a name of single field.
 * Operations: OR - '|', AND - '&', XOR - '^'. 
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'spec' is invalid.
 */