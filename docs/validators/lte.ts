/**
 * @name {lte<T>(bound: T, error?: Error): Validator<T>}
 * 
 * @desc Checks value to be lower or equal to 'match' param. Requires the same type.
 * 
 * {@link docs/type-validator}
 * 
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * 
 * {@link docs/error-param}
 * 
 * {@link docs/validator-result}
 * 
 * @throws {string} Will throw an error if 'bound' is invalid.
 */