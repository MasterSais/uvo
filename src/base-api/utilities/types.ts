import { Lengthy, Validator } from '@lib/base-api/types';

export const valueOf = (value: any) => value ? value.valueOf() : value;

export const isEmpty = (value: any) => (value === null) || (value === undefined) || (value === '');

export const isOneType = (a: any, b: any): boolean => typeof a === typeof b;

export const isDefined = (value: any): boolean => value !== undefined;

export const isPromise = (value: any): boolean => value && value.then;

export const isFinite = (global || window).isFinite as ((value: any) => boolean);

export const isFiniteNumber = Number.isFinite as ((value: any) => boolean);

export const isNumber = (value: any): boolean => typeof value === 'number';

export const isRegEx = (value: any): boolean => value && value.constructor === RegExp;

export const isString = (value: any): boolean => typeof value === 'string';

export const isBoolean = (value: any): boolean => typeof value === 'boolean';

export const isFunction = (value: any): boolean => typeof value === 'function';

export const isObjectLike = (value: any): boolean => typeof value === 'object';

export const isObject = (value: any): boolean => value && typeof value === 'object' && value.constructor === Object;

export const hasIndex = (value: any): boolean => value && value.indexOf;

export const isArray = (value: any): boolean => Array.isArray(value);

export const isLengthy = <T extends Lengthy>(value: T) => value !== null && (isObjectLike(value) || isString(value)) && isFiniteNumber(value.length);

export const callee = (value: any): any => (isFunction(value) ? value : (() => value));

export const identity = (value: any) => value;

export const isValidatorsSequence = (validators: Array<Validator<any, any>>): boolean => (
  validators.reduce((result: boolean, validator) => result && isFunction(validator), true)
);

export const toArray = <T>(params?: Array<T> | T): Array<T> => (
  Array.isArray(params) ? params : [params]
);