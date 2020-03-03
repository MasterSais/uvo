var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.V_INT = 'integer';
    exports.V_EQ = 'equal';
    exports.V_REG = 'regex';
    exports.V_NEQ = 'notEqual';
    exports.V_GTE = 'gte';
    exports.V_LTE = 'lte';
    exports.V_OOF = 'oneOf';
    exports.V_LEN = 'len';
    exports.V_MXLEN = 'maxLen';
    exports.V_MNLEN = 'minLen';
    exports.V_FIELDS = 'fields';
    exports.V_NUM = 'number';
    exports.V_STR = 'string';
    exports.V_BLN = 'bool';
    exports.V_ARR = 'array';
    exports.V_OBJ = 'object';
    exports.G_CONS = 'consecutive';
    exports.G_PRLL = 'parallel';
    exports.G_OR = 'or';
    exports.G_TRM = 'transform';
    exports.S_GDP = 'getDep';
    exports.S_SDP = 'setDep';
    exports.S_SVDP = 'setVDep';
    exports.S_DFT = 'useDefault';
    exports.C_ERR = 'withError';
    exports.C_MET = 'withMeta';
    exports.C_PRM = 'withPromise';
    var toArray = function (params) {
        return Array.isArray(params) ? params : [params];
    };
    var setMetaPath = function (meta, path) { return (meta && __assign(__assign({}, meta), { path: meta.path.concat(path ? [path] : []) })); };
    var setMetaValidator = function (meta, validator, params) {
        if (params === void 0) { params = []; }
        return (meta && __assign(__assign({}, meta), { params: params, validator: validator }));
    };
    var postToMeta = function (value, field, meta) { return (meta
        ? (meta._deps[field] = value)
        : value); };
    var getFromMeta = function (field, meta) { return (meta ? meta._deps[field] : null); };
    var applyError = function (error, onError, meta) {
        return (onError && onError(error, meta), null);
    };
    var throwValidatorError = function (validator) {
        throw validator;
    };
    var isEmpty = function (value) { return (value === null) || (value === undefined) || (value === ''); };
    var isOneType = function (a, b) { return typeof a === typeof b; };
    var isDefined = function (value) { return value !== undefined; };
    var isFinite = function (value) { return (global || window).isFinite(value); };
    var isFiniteNumber = function (value) { return Number.isFinite(value); };
    var isNumber = function (value) { return typeof value === 'number'; };
    var isString = function (value) { return typeof value === 'string'; };
    var isBoolean = function (value) { return typeof value === 'boolean'; };
    var isFunction = function (value) { return typeof value === 'function'; };
    var isObjectLike = function (value) { return typeof value === 'object'; };
    var isObject = function (value) { return value && typeof value === 'object' && value.constructor === Object; };
    var isArray = function (value) { return Array.isArray(value); };
    var isValidatorsSequence = function (validators) {
        return validators.reduce(function (result, validator) { return result && isFunction(validator); }, true);
    };
    exports.consecutive = function () {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        return (isValidatorsSequence(validators)
            ? (function (value, onError, meta) {
                return validators.reduce(function (value, nextValidator) {
                    return (value !== null
                        ? nextValidator(value, onError, meta)
                        : null);
                }, value);
            })
            : throwValidatorError(exports.G_CONS));
    };
    exports.or = function () {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        return (isValidatorsSequence(validators)
            ? (function (value, onError, meta) {
                var processed = null;
                var relevance = { value: false };
                validators.find(function (nextValidator) {
                    return (processed = nextValidator(value, onError ? function (error, meta) { return onError(error, meta, relevance); } : null, meta),
                        processed !== null);
                });
                if (processed === null) {
                    relevance.value = true;
                }
                return processed;
            })
            : throwValidatorError(exports.G_OR));
    };
    exports.parallel = function () {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        return (isValidatorsSequence(validators)
            ? (function (value, onError, meta) {
                return validators.reduce(function (validated, nextValidator) {
                    return (validated !== null
                        ? nextValidator(value, onError, meta)
                        : (nextValidator(value, onError, meta), null));
                }, value);
            })
            : throwValidatorError(exports.G_PRLL));
    };
    exports.transform = function () {
        var processors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            processors[_i] = arguments[_i];
        }
        return (isValidatorsSequence(processors)
            ? (function (value) {
                return processors.reduce(function (value, processor) { return processor(value); }, value);
            })
            : throwValidatorError(exports.G_TRM));
    };
    exports.getDep = function (field, preValidator) {
        return ((isString(field) && field.length > 0)
            ? (isFunction(preValidator)
                ? (function (value, onError, meta) {
                    var validators = preValidator(getFromMeta(field, meta));
                    if (!validators)
                        return value;
                    var validatorsList = toArray(validators);
                    return (isValidatorsSequence(validatorsList)
                        ? (validatorsList.reduce(function (value, nextValidator) {
                            return (value !== null
                                ? nextValidator(value, onError, meta)
                                : null);
                        }, value))
                        : throwValidatorError(exports.S_GDP));
                })
                : function (_value, _onError, meta) { return getFromMeta(field, meta); })
            : throwValidatorError(exports.S_GDP));
    };
    exports.setDep = function (field, extValue) {
        return ((isString(field) && field.length > 0)
            ? (function (value, _onError, meta) {
                return postToMeta(isDefined(extValue)
                    ? (isFunction(extValue)
                        ? extValue(meta)
                        : extValue)
                    : value, field, meta);
            })
            : throwValidatorError(exports.S_SDP));
    };
    exports.setVDep = function (field) {
        var validators = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            validators[_i - 1] = arguments[_i];
        }
        return ((isString(field) && field.length > 0 && isValidatorsSequence(validators) && validators.length > 0)
            ? (function (value, onError, meta) {
                return (postToMeta(validators, field, meta),
                    validators.reduce(function (value, nextValidator) {
                        return value !== null
                            ? nextValidator(value, onError, meta)
                            : null;
                    }, value));
            })
            : throwValidatorError(exports.S_SVDP));
    };
    exports.useDefault = function (defaultValue) {
        var validators = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            validators[_i - 1] = arguments[_i];
        }
        return ((isValidatorsSequence(validators))
            ? (function (value, onError, meta) {
                return !isEmpty(value)
                    ? (validators.reduce(function (value, nextValidator) {
                        return value !== null
                            ? nextValidator(value, onError, meta)
                            : null;
                    }, value))
                    : (isFunction(defaultValue)
                        ? defaultValue(meta)
                        : defaultValue);
            })
            : throwValidatorError(exports.S_DFT));
    };
    exports.array = function (itemSpec, error) {
        var validators = toArray(itemSpec);
        var isValidSequence = isValidatorsSequence(validators);
        if (!itemSpec || isValidSequence) {
            var validator_1 = isValidSequence && exports.consecutive.apply(void 0, validators);
            return (function (data, onError, meta) {
                return isArray(data)
                    ? (validator_1
                        ? data.map(function (value, index) { return validator_1(value, onError, setMetaPath(meta, index)); })
                        : data)
                    : applyError(error, onError, setMetaValidator(meta, exports.V_ARR, [data]));
            });
        }
        else {
            return throwValidatorError(exports.V_ARR);
        }
    };
    var possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];
    exports.bool = function (error) {
        return function (value, onError, meta) {
            var index = (possibleValues.indexOf(value));
            return (index >= 0
                ? Boolean(index % 2)
                : applyError(error, onError, setMetaValidator(meta, exports.V_BLN)));
        };
    };
    exports.equal = function (match, error) {
        return function (value, onError, meta) {
            return (value === match)
                ? value : applyError(error, onError, setMetaValidator(meta, exports.V_EQ, [match]));
        };
    };
    var fieldsMap = {
        op: function (value, names) {
            return names.reduce(function (result, field) {
                return result + Number(isString(field) ? !isEmpty(value[field]) : fieldsMap[field[0]](value, field.slice(1)));
            }, 0);
        },
        '&': function (value, names) {
            return fieldsMap.op(value, names) === names.length;
        },
        '|': function (value, names) {
            return fieldsMap.op(value, names) > 0;
        },
        '^': function (value, names) {
            return fieldsMap.op(value, names) === 1;
        }
    };
    var isLogicalLexeme = function (lexeme) { return ['&', '|', '^'].indexOf(lexeme) >= 0; };
    var validateFieldsSpec = function (spec) {
        return (isString(spec) && spec.length > 0 && !isLogicalLexeme(spec))
            || (isArray(spec)
                && spec.length > 2
                && isLogicalLexeme(spec[0])
                && spec
                    .reduce(function (result, field, index) { return index === 0 || result && validateFieldsSpec(field); }, true));
    };
    exports.fields = function (spec, error) {
        return (validateFieldsSpec(spec)
            ? (function (value, onError, meta) {
                return (isObject(value)
                    && (fieldsMap.op(value, [spec]) > 0))
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_FIELDS, [spec]));
            })
            : throwValidatorError(exports.V_FIELDS));
    };
    exports.gte = function (bound, error) {
        return ((isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
            ? (function (value, onError, meta) {
                return (isOneType(value, bound)
                    && value >= bound)
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_GTE, [bound]));
            })
            : throwValidatorError(exports.V_GTE));
    };
    exports.integer = function (error) {
        return function (value, onError, meta) {
            return (isNumber(value)
                && value % 1 === 0)
                ? value : applyError(error, onError, setMetaValidator(meta, exports.V_INT));
        };
    };
    exports.len = function (len, error) {
        return ((isFiniteNumber(len) && len >= 0)
            ? (function (value, onError, meta) {
                return (value !== null
                    && (isObjectLike(value) || isString(value))
                    && isFiniteNumber(value.length)
                    && value.length === len)
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_LEN, [len]));
            })
            : throwValidatorError(exports.V_LEN));
    };
    exports.lte = function (bound, error) {
        return ((isFiniteNumber(bound) || isString(bound) || isBoolean(bound))
            ? (function (value, onError, meta) {
                return (isOneType(value, bound)
                    && value <= bound)
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_LTE, [bound]));
            })
            : throwValidatorError(exports.V_LTE));
    };
    exports.maxLen = function (len, error) {
        return ((isFiniteNumber(len) && len >= 0)
            ? (function (value, onError, meta) {
                return (value !== null
                    && (isObjectLike(value) || isString(value))
                    && isFiniteNumber(value.length)
                    && value.length <= len)
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_MXLEN, [len]));
            })
            : throwValidatorError(exports.V_MXLEN));
    };
    exports.minLen = function (len, error) {
        return ((isFiniteNumber(len) && len >= 0)
            ? (function (value, onError, meta) {
                return (value !== null
                    && (isObjectLike(value) || isString(value))
                    && isFiniteNumber(value.length)
                    && value.length >= len)
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_MNLEN, [len]));
            })
            : throwValidatorError(exports.V_MNLEN));
    };
    exports.notEqual = function (match, error) {
        return function (value, onError, meta) {
            return (value !== match)
                ? value : applyError(error, onError, setMetaValidator(meta, exports.V_NEQ, [match]));
        };
    };
    exports.number = function (error) {
        return function (value, onError, meta) {
            return (value !== null
                && value !== String()
                && !isArray(value)
                && isFinite(value))
                ? Number(value) : applyError(error, onError, setMetaValidator(meta, exports.V_NUM));
        };
    };
    exports.object = function (spec, error) {
        var specList = [];
        var isSpecObject = isObject(spec);
        isSpecObject && (Object
            .keys(spec)
            .forEach(function (key) { return specList.push([key, toArray(spec[key])]); }));
        if (isSpecObject || !spec) {
            var validators_1 = spec && specList.map(function (_a) {
                var key = _a[0], processors = _a[1];
                return [key, exports.consecutive.apply(void 0, processors)];
            });
            return function (data, onError, meta) {
                return (data !== null
                    && isObject(data))
                    ? (validators_1
                        ? validators_1.reduce(function (result, _a) {
                            var key = _a[0], validator = _a[1];
                            return (result[key] = validator(data[key], onError, setMetaPath(meta, key)), result);
                        }, {})
                        : data)
                    : applyError(error, onError, setMetaValidator(meta, exports.V_OBJ, [spec]));
            };
        }
        else {
            return throwValidatorError(exports.V_OBJ);
        }
    };
    var isNestedArrays = function (value) { return isArray(value) && (value.reduce(function (result, item) { return result && isArray(item); }, true)); };
    exports.object2 = function (spec, error) {
        var specList = [];
        var isSpecArray = isNestedArrays(spec);
        isSpecArray && (spec.forEach(function (_a) {
            var key = _a[0], validators = _a.slice(1);
            return specList.push([key, toArray(validators)]);
        }));
        var isSpecValid = isSpecArray && specList.reduce(function (result, _a) {
            var key = _a[0];
            return result && key.length > 0;
        }, true);
        if (isSpecValid || !spec) {
            var validators_2 = spec && specList.map(function (_a) {
                var key = _a[0], processors = _a[1];
                return [key, exports.consecutive.apply(void 0, processors)];
            });
            return function (data, onError, meta) {
                return (data !== null
                    && isObject(data))
                    ? (validators_2
                        ? validators_2.reduce(function (result, _a) {
                            var key = _a[0], processor = _a[1];
                            return (result[key] = processor(data[key], onError, setMetaPath(meta, key)), result);
                        }, {})
                        : data)
                    : applyError(error, onError, setMetaValidator(meta, exports.V_OBJ, [spec]));
            };
        }
        else {
            return throwValidatorError(exports.V_OBJ);
        }
    };
    exports.oneOf = function (candidates, error) {
        return (isArray(candidates)
            ? (function (value, onError, meta) {
                return (value !== null
                    && candidates.indexOf(value) >= 0)
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_OOF, [candidates]));
            })
            : throwValidatorError(exports.V_OOF));
    };
    exports.regex = function (match, error) {
        return ((match && match.constructor === RegExp)
            ? (function (value, onError, meta) {
                return (match.test(value))
                    ? value : applyError(error, onError, setMetaValidator(meta, exports.V_REG, [match]));
            })
            : throwValidatorError(exports.V_REG));
    };
    exports.string = function (error) {
        return function (value, onError, meta) {
            return (isDefined(value)
                && !isObjectLike(value)
                && !isFunction(value))
                ? String(value) : applyError(error, onError, setMetaValidator(meta, exports.V_STR));
        };
    };
    exports.clamp = function (min, max) {
        return function (value) { return value < min ? min : (value > max ? max : value); };
    };
    exports.withErrors = function (validator, commonErrorProcessor) {
        return (isFunction(validator)
            ? (function (value, _onError, meta) {
                var errors = [];
                var addError = function (error, relevance) {
                    return errors.push({ error: error, relevance: relevance || { value: true } });
                };
                var errorProcessor = function (error, meta, relevance) {
                    return error && (isFunction(error)
                        ? addError(error(meta), relevance)
                        : addError(error, relevance)) || commonErrorProcessor && addError(commonErrorProcessor(meta), relevance);
                };
                var result = validator(value, errorProcessor, meta);
                return {
                    result: result,
                    errors: errors.length > 0
                        ? errors.filter(function (_a) {
                            var relevance = _a.relevance;
                            return relevance.value;
                        }).map(function (_a) {
                            var error = _a.error;
                            return error;
                        })
                        : null
                };
            })
            : throwValidatorError(exports.C_ERR));
    };
    exports.withMeta = function (validator) {
        return (isFunction(validator)
            ? (function (value, onError) {
                return validator(value, onError, { path: [], _deps: {}, params: [] });
            })
            : throwValidatorError(exports.C_MET));
    };
    exports.withPromise = function (validator) {
        return (isFunction(validator)
            ? (function (value, onError, meta) {
                return new Promise(function (resolve, reject) {
                    var data = validator(value, onError, meta);
                    data.errors
                        ? reject(data.errors)
                        : resolve((data.result || data));
                });
            })
            : throwValidatorError(exports.C_PRM));
    };
});
