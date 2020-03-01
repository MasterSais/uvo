/** @type {string} */
export const V_INT = 'integer';
/** @type {string} */
export const V_EQ = 'equal';
/** @type {string} */
export const V_REG = 'regex';
/** @type {string} */
export const V_NEQ = 'notEqual';
/** @type {string} */
export const V_GTE = 'gte';
/** @type {string} */
export const V_LTE = 'lte';
/** @type {string} */
export const V_OOF = 'oneOf';
/** @type {string} */
export const V_LEN = 'len';
/** @type {string} */
export const V_MXLEN = 'maxLen';
/** @type {string} */
export const V_MNLEN = 'minLen';
/** @type {string} */
export const V_FIELDS = 'fields';
/** @type {string} */
export const V_NUM = 'number';
/** @type {string} */
export const V_STR = 'string';
/** @type {string} */
export const V_BLN = 'bool';
/** @type {string} */
export const V_ARR = 'array';
/** @type {string} */
export const V_OBJ = 'object';
const isEmpty = (value) => (value === null) || (value === undefined) || (value === '');
const toArray = (params) => Array.isArray(params) ? params : [params];
const setMetaPath = (meta, path) => (meta && {
    ...meta,
    path: meta.path.concat(path ? [path] : [])
});
const setMetaValidator = (meta, validator, params = []) => (meta && {
    ...meta, params, validator
});
const postToMeta = (value, field, meta) => (meta
    ? (meta._deps[field] = value)
    : value);
const getFromMeta = (field, meta) => (meta && meta._deps[field] || null);
const applyError = (error, onError, meta) => (onError && onError(error, meta), null);
const validatorParamsError = (validator) => {
    throw validator;
};
const isOneType = (a, b) => typeof a === typeof b;
const isFinite = (value) => (global || window).isFinite(value);
const isFiniteNumber = (value) => Number.isFinite(value);
const isNumber = (value) => typeof value === 'number';
const isString = (value) => typeof value === 'string';
const isBoolean = (value) => typeof value === 'boolean';
const isFunction = (value) => typeof value === 'function';
const isObjectLike = (value) => typeof value === 'object';
const isObject = (value) => value && typeof value === 'object' && value.constructor === Object;
const isArray = (value) => Array.isArray(value);
const isValidatorsSequence = (validators) => validators.reduce((result, validator) => result && isFunction(validator), true);
export const consecutive = (...validators) => (value, onError, meta) => validators.reduce((value, nextValidator) => (value !== null ? nextValidator(value, onError, meta) : null), value);
export const getDep = (field, preValidator) => (value, onError, meta) => toArray(preValidator(getFromMeta(field, meta)))
    .reduce((value, nextValidator) => (value !== null ? nextValidator(value, onError, meta) : null), value);
export const mergeDep = (field) => (_value, _onError, meta) => getFromMeta(field, meta);
export const or = (...validators) => (value, onError, meta) => {
    let processed = null;
    const relevance = { value: false };
    validators.find((nextValidator) => (processed = nextValidator(value, onError ? (error, meta) => onError(error, meta, relevance) : null, meta),
        processed !== null));
    if (processed === null) {
        relevance.value = true;
    }
    return processed;
};
export const parallel = (...validators) => (value, onError, meta) => validators.reduce((validated, nextValidator) => (validated !== null ? nextValidator(validated, onError, meta) : (nextValidator(value, onError, meta), null)), value);
export const setDep = (field) => (value, _onError, meta) => postToMeta(value, field, meta);
export const setVDep = (field, ...validators) => (value, onError, meta) => (postToMeta(validators, field, meta), validators.reduce((value, nextValidator) => (value !== null ? nextValidator(value, onError, meta) : null), value));
export const transform = (...transformers) => (value, onError, meta) => transformers.reduce((value, processor) => processor(value, onError, meta), value);
export const useDefault = (defaultValue, ...validators) => (value, onError, meta) => !isEmpty(value)
    ? validators.reduce((value, nextValidator) => (value !== null ? nextValidator(value, onError, meta) : null), value)
    : (isFunction(defaultValue)
        ? defaultValue(meta)
        : defaultValue);
/**
 * Type: semi validator, semi processor. Checks value to be an array.
 *
 * @param {(Array<Processor> | Processor)=} itemSpec Validator(s) of array elements.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'itemSpec' is invalid.
 */
export const array = (itemSpec, error) => {
    const validators = toArray(itemSpec);
    const isValidSequence = isValidatorsSequence(validators);
    if (!itemSpec || isValidSequence) {
        const validator = isValidSequence && consecutive(...validators);
        return ((data, onError, meta) => isArray(data)
            ? (validator
                ? data.map((value, index) => validator(value, onError, setMetaPath(meta, index)))
                : data)
            : applyError(error, onError, setMetaValidator(meta, V_ARR, [data])));
    }
    else {
        return validatorParamsError(V_ARR);
    }
};
const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];
/**
 * Type: semi validator, semi processor. Checks value to be a boolean compatible.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const bool = (error) => (value, onError, meta) => {
    const index = (possibleValues.indexOf(value));
    return (index >= 0
        ? Boolean(index % 2)
        : applyError(error, onError, setMetaValidator(meta, V_BLN)));
};
/**
 * Type: validator. Checks value to be equal to 'match' param. Requires the same type. Shallow comparison.
 *
 * @param {any} match Match.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const equal = (match, error) => (value, onError, meta) => (value === match)
    ? value : applyError(error, onError, setMetaValidator(meta, V_EQ, [match]));
const fieldsMap = {
    op: (value, names) => names.reduce((result, field) => result + Number(isString(field) ? !isEmpty(value[field]) : fieldsMap[field[0]](value, field.slice(1))), 0),
    '&': (value, names) => fieldsMap.op(value, names) === names.length,
    '|': (value, names) => fieldsMap.op(value, names) > 0,
    '^': (value, names) => fieldsMap.op(value, names) === 1
};
const isLogicalLexeme = (lexeme) => ['&', '|', '^'].indexOf(lexeme) >= 0;
const validateFieldsSpec = (spec) => (isString(spec) && spec.length > 0 && !isLogicalLexeme(spec))
    || (isArray(spec)
        && spec.length > 2
        && isLogicalLexeme(spec[0])
        && spec
            .reduce((result, field, index) => index === 0 || result && validateFieldsSpec(field), true));
/**
 * Type: validator. Checks for fields in the input object.
 *
 * @param {Array|string} spec Fields specification.
 * If array, the first element represents a logical operation, otherwise a name of single field.
 * Operations: OR - '|', AND - '&', XOR - '^'.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export const fields = (spec, error) => (validateFieldsSpec(spec)
    ? ((value, onError, meta) => (isObject(value)
        && (fieldsMap.op(value, [spec]) > 0))
        ? value : applyError(error, onError, setMetaValidator(meta, V_FIELDS, [spec])))
    : validatorParamsError(V_FIELDS));
/**
 * Type: validator. Checks value to be greater or equal to 'match' param. Requires the same type.
 *
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'bound' is invalid.
 */
export const gte = (bound, error) => ((isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
    ? ((value, onError, meta) => (isOneType(value, bound)
        && value >= bound)
        ? value : applyError(error, onError, setMetaValidator(meta, V_GTE, [bound])))
    : validatorParamsError(V_GTE));
/**
 * Type: validator. Checks number to be an integer.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const integer = (error) => (value, onError, meta) => (isNumber(value)
    && value % 1 === 0)
    ? value : applyError(error, onError, setMetaValidator(meta, V_INT));
/**
 * Type: validator. Checks length to be equal to 'len' param. Requires to be object like.
 *
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export const len = (len, error) => ((isFiniteNumber(len) && len >= 0)
    ? ((value, onError, meta) => (value !== null
        && (isObjectLike(value) || isString(value))
        && isFiniteNumber(value.length)
        && value.length === len)
        ? value : applyError(error, onError, setMetaValidator(meta, V_LEN, [len])))
    : validatorParamsError(V_LEN));
/**
 * Type: validator. Checks value to be lower or equal to 'match' param. Requires the same type.
 *
 * @param {number | string | boolean} bound Boundary value. One of three types: number, string, boolean.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'bound' is invalid.
 */
export const lte = (bound, error) => ((isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
    ? ((value, onError, meta) => (isOneType(value, bound)
        && value <= bound)
        ? value : applyError(error, onError, setMetaValidator(meta, V_LTE, [bound])))
    : validatorParamsError(V_LTE));
/**
 * Type: validator. Checks length to be equal to 'len' param. Requires to be object like.
 *
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export const maxLen = (len, error) => ((isFiniteNumber(len) && len >= 0)
    ? ((value, onError, meta) => (value !== null
        && (isObjectLike(value) || isString(value))
        && isFiniteNumber(value.length)
        && value.length <= len)
        ? value : applyError(error, onError, setMetaValidator(meta, V_MXLEN, [len])))
    : validatorParamsError(V_MXLEN));
/**
 * Type: validator. Checks length to be equal to 'len' param. Requires to be object like.
 *
 * @param {number} len Reference length. Positive finite number.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'len' is invalid.
 */
export const minLen = (len, error) => ((isFiniteNumber(len) && len >= 0)
    ? ((value, onError, meta) => (value !== null
        && (isObjectLike(value) || isString(value))
        && isFiniteNumber(value.length)
        && value.length >= len)
        ? value : applyError(error, onError, setMetaValidator(meta, V_MNLEN, [len])))
    : validatorParamsError(V_MNLEN));
/**
 * Type: validator. Checks value to be not equal to 'match' param. Requires the same type. Shallow comparison.
 *
 * @param {any} match Match.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 */
export const notEqual = (match, error) => (value, onError, meta) => (value !== match)
    ? value : applyError(error, onError, setMetaValidator(meta, V_NEQ, [match]));
/**
 * Type: semi validator, semi processor. Checks value to be a number compatible.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const number = (error) => (value, onError, meta) => (value !== null
    && value !== String()
    && !isArray(value)
    && isFinite(value))
    ? Number(value) : applyError(error, onError, setMetaValidator(meta, V_NUM));
/**
 * Type: semi validator, semi processor. Checks value to be an object.
 *
 * @param {ObjectRecords=} spec Validators scheme for object.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export const object = (spec, error) => {
    const specList = [];
    const isSpecObject = isObject(spec);
    isSpecObject && (Object
        .keys(spec)
        .forEach((key) => specList.push([key, toArray(spec[key])])));
    const isSpecValid = isSpecObject && specList.reduce((result, [_, validators]) => result && isValidatorsSequence(validators), true);
    if (isSpecValid || !spec) {
        const validators = spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);
        return (data, onError, meta) => (data !== null
            && isObject(data))
            ? (validators
                ? validators.reduce((result, [key, validator]) => (result[key] = validator(data[key], onError, setMetaPath(meta, key)), result), {})
                : data)
            : applyError(error, onError, setMetaValidator(meta, V_OBJ, [spec]));
    }
    else {
        return validatorParamsError(V_OBJ);
    }
};
const isNestedArrays = (value) => isArray(value) && (value.reduce((result, item) => result && isArray(item), true));
/**
 * Type: semi validator, semi processor. Checks value to be an object.
 *
 * @param {Array=} spec Validators scheme for object in form of array. Provides strict ordering.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'spec' is invalid.
 */
export const object2 = (spec, error) => {
    const specList = [];
    const isSpecArray = isNestedArrays(spec);
    isSpecArray && (spec.forEach(([key, ...validators]) => specList.push([key, toArray(validators)])));
    const isSpecValid = isSpecArray && specList.reduce((result, [key, validators]) => result && isValidatorsSequence(validators) && key.length > 0, true);
    if (isSpecValid || !spec) {
        const validators = spec && specList.map(([key, processors]) => [key, consecutive(...processors)]);
        return (data, onError, meta) => (data !== null
            && isObject(data))
            ? (validators
                ? validators.reduce((result, [key, processor]) => (result[key] = processor(data[key], onError, setMetaPath(meta, key)), result), {})
                : data)
            : applyError(error, onError, setMetaValidator(meta, V_OBJ, [spec]));
    }
    else {
        return validatorParamsError(V_OBJ);
    }
};
/**
 * Type: validator. Checks value to be one of expected. Shallow comparison.
 *
 * @param {Array} candidates List of possible expected values.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'candidates' is invalid.
 */
export const oneOf = (candidates, error) => (isArray(candidates)
    ? ((value, onError, meta) => (value !== null
        && candidates.indexOf(value) >= 0)
        ? value : applyError(error, onError, setMetaValidator(meta, V_OOF, [candidates])))
    : validatorParamsError(V_OOF));
const isRegEx = (value) => value && value.constructor === RegExp;
/**
 * Type: validator. Checks value to match a pattern.
 *
 * @param {RegExp} match Pattern.
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Validator} Function that takes: value, error callback and custom metadata.
 * @throws {string} Will throw an error if 'match' is invalid.
 */
export const regex = (match, error) => (isRegEx(match)
    ? ((value, onError, meta) => (match.test(value))
        ? value : applyError(error, onError, setMetaValidator(meta, V_REG, [match])))
    : validatorParamsError(V_REG));
/**
 * Type: semi validator, semi processor. Checks value to be a string compatible.
 *
 * @param {Error=} error (Optional) Any type's error.
 * Can be a function that accepts error metadata (available if 'meta' is provided in the validator) and returns an error.
 * @return {Processor} Function that takes: value, error callback and custom metadata.
 */
export const string = (error) => (value, onError, meta) => (value !== undefined
    && !isObjectLike(value)
    && !isFunction(value))
    ? String(value) : applyError(error, onError, setMetaValidator(meta, V_STR));
export const clamp = (min, max) => (value) => value < min && min || value > max && max || value;
export const withErrors = (validator, commonErrorProcessor) => (value, _onError, meta) => {
    const errors = [];
    const addError = (error, relevance) => errors.push({ error, relevance: relevance || { value: true } });
    const errorProcessor = (error, meta, relevance) => error && (isFunction(error)
        ? addError(error(meta), relevance)
        : addError(error, relevance)) || commonErrorProcessor && addError(commonErrorProcessor(meta), relevance);
    const result = validator(value, errorProcessor, meta);
    return {
        result,
        errors: errors.length > 0
            ? errors.filter(({ relevance }) => relevance.value).map(({ error }) => error)
            : null
    };
};
export const withMeta = (validator) => (value, onError) => validator(value, onError, { path: [], _deps: {}, params: [] });
export const withPromise = (validator) => (value, onError, meta) => new Promise((resolve, reject) => {
    const data = validator(value, onError, meta);
    data.errors ? reject(data.errors) : resolve(data.result || data);
});
