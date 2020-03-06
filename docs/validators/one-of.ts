/**
 * @name {oneOf<T>(candidates: Array<T>, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be one of expected. Shallow comparison.
 * 
 * {@link docs/type-validator}
 * 
 * @param {Array} candidates List of possible expected values.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'candidates' is invalid.
 */