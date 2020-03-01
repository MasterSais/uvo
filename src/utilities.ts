import { Error, ErrorCallback, MetaData, Processor } from './types';

export const toArray = <T>(params?: Array<T> | T): Array<T> =>
  Array.isArray(params) ? params : [params];

export const setMetaPath = (meta: MetaData, path: string | number): MetaData => (meta && {
  ...meta,
  path: meta.path.concat(path ? [path] : [])
});

export const setMetaValidator = (meta: MetaData, validator: string, params: Array<any> = []): MetaData => (meta && {
  ...meta, params, validator
});

export const postToMeta = <T>(value: T, field: string, meta: MetaData): T => (
  meta
    ? (meta._deps[field] = value)
    : value
);

export const getFromMeta = <T>(field: string, meta: MetaData): T => (
  meta && meta._deps[field] || null
);

export const applyError = (error: Error, onError: ErrorCallback, meta: MetaData): null =>
  (onError && onError(error, meta), null);

export const throwValidatorError = (validator: string) => {
  throw validator;
};

export const isEmpty = (value: any) => (value === null) || (value === undefined) || (value === '');

export const isOneType = (a: any, b: any): boolean => typeof a === typeof b;

export const isDefined = (value: any): boolean => value !== undefined;

export const isFinite = (value: any): boolean => (global || window).isFinite(value);

export const isFiniteNumber = (value: any): boolean => Number.isFinite(value);

export const isNumber = (value: any): boolean => typeof value === 'number';

export const isString = (value: any): boolean => typeof value === 'string';

export const isBoolean = (value: any): boolean => typeof value === 'boolean';

export const isFunction = (value: any): boolean => typeof value === 'function';

export const isObjectLike = (value: any): boolean => typeof value === 'object';

export const isObject = (value: any): boolean => value && typeof value === 'object' && value.constructor === Object;

export const isArray = (value: any): boolean => Array.isArray(value);

export const isValidatorsSequence = (validators: Array<Processor<any, any>>): boolean =>
  validators.reduce((result: boolean, validator) => result && isFunction(validator), true);