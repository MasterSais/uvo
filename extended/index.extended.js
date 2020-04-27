const invertCondition = (condition, invert) => invert ? !condition : condition;
const invertError = (name, invert) => invert ? `not:${name}` : name;
const makeAsync = (validator) => (validator.async = true, validator);
const makeInvertible = (factory) => {
    const validator = factory(false);
    validator.not = factory(true);
    return validator;
};
const makeCheckable = (factory) => {
    const validator = factory(false);
    validator.check = factory(true);
    return validator;
};
const isFactory = (validator, param) => ((comparator, error) => (isFunction(comparator)
    ? (param = callee(param),
        (value, onError, meta) => {
            const paramData = param();
            extendMeta(meta, value, validator, isDefined(paramData) ? [paramData] : []);
            return (comparator(value, paramData)
                ? value
                : applyError(error, onError, meta));
        })
    : throwValidatorError(validator)));
const lengthFactory = (validator, comparator) => ((makeInvertible(((invert) => (len, error) => isFactory(invertError(validator, invert), len)((value, param) => isLengthy(value) && invertCondition(comparator(value.length, param), invert), error)))));
const multipleFactory = (validator) => ((makeInvertible(((invert) => (multiplier, error) => isFactory(invertError(validator, invert), multiplier)((value, param) => isNumber(value) && invertCondition(value % param === 0, invert), error)))));
const valueOf = (value) => value ? value.valueOf() : value;
const isEmpty = (value) => (value === null) || (value === undefined) || (value === '');
const isOneType = (a, b) => typeof a === typeof b;
const isDefined = (value) => value !== undefined;
const isPromise = (value) => value && value.then;
const isFinite = (global || window).isFinite;
const isFiniteNumber = Number.isFinite;
const isNumber = (value) => typeof value === 'number';
const isRegEx = (value) => value && value.constructor === RegExp;
const isString = (value) => typeof value === 'string';
const isBoolean = (value) => typeof value === 'boolean';
const isFunction = (value) => typeof value === 'function';
const isObjectLike = (value) => typeof value === 'object';
const isObject = (value) => value && typeof value === 'object' && value.constructor === Object;
const hasIndex = (value) => value && value.indexOf;
const isArray = (value) => Array.isArray(value);
const isLengthy = (value) => value !== null && (isObjectLike(value) || isString(value)) && isFiniteNumber(value.length);
const callee = (value) => (isFunction(value) ? value : (() => value));
const identity = (value) => value;
const isValidatorsSequence = (validators) => (validators.reduce((result, validator) => result && isFunction(validator), true));
const toArray = (params) => (Array.isArray(params) ? params : [params]);
const setMetaPath = (meta, path) => (meta && {
    ...meta,
    path: meta.path.concat(path)
});
const extendMeta = (meta, value, validator, params = []) => (meta && (meta.validator = validator,
    meta.params = params,
    meta._logs.push([validator, value, params])), meta);
const postToMeta = (value, field, meta) => (meta
    ? (meta._deps[field] = value)
    : value);
const getFromMeta = (field, meta) => (meta ? meta._deps[field] : null);
const postAsyncToMeta = (value, field, meta) => (meta && isDefined(field)
    ? (meta._asyncStack[field] = value)
    : value);
const getAsyncFromMeta = (field, meta) => (meta ? meta._asyncStack[field] : null);
const applyError = (error, onError, meta) => (onError && onError(error, meta), null);
const throwValidatorError = (validator) => {
    throw `Invalid params provided in '${validator}'`;
};
const passValidators = (value, onError, meta, validators) => {
    for (let i = 0; i < validators.length;) {
        if (isPromise(value)) {
            let hasError = false;
            const onSeqError = (error, meta, relevance) => (hasError = true,
                onError && onError(error, meta, relevance));
            for (; i < validators.length; i++) {
                const validator = validators[i];
                value = (validator.async
                    ? validator(value, onSeqError, meta)
                    : value.then((inValue) => (!(hasError = hasError && inValue === null)
                        ? validator(inValue, onSeqError, meta)
                        : null)));
            }
            break;
        }
        value = validators[i++](value, onError, meta);
        if (value === null)
            break;
    }
    return value;
};
const onAsync = (value, callee) => (isPromise(value)
    ? value.then(callee).catch((error) => callee(null, error))
    : callee(value));
const asyncActor = () => {
    const actions = [];
    return ([
        (value, callee) => (isPromise(value)
            ? actions.push(value.then(callee).catch((error) => callee(null, error)))
            : callee(value)),
        (value) => (actions.length > 0
            ? Promise.all(actions).then(() => value)
            : value)
    ]);
};
export const V_MAIL = 'email';
export const V_URL = 'url';
const emailRegEx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const email = ((error) => isFactory(V_MAIL)((value) => emailRegEx.test(value), error));
const fastEmailRegEx = new RegExp(/^\S+@\S+\.\S+$/);
export const fastEmail = ((error) => isFactory(V_MAIL)((value) => fastEmailRegEx.test(value), error));
const urlRegEx = new RegExp(/^https?:\/\/[^\s$.?#].[^\s]*$/i);
export const url = ((error) => isFactory(V_URL)((value) => urlRegEx.test(value), error));
