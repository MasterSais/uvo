import { V_EQ, V_GTE, V_LTE, V_MLP, V_OOF } from '@lib/classic-api/names';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { Error } from '@lib/classic-api/types';
import { isArray, isDefined, isNumber, isOneType, isString } from '@lib/classic-api/utilities';
import { REF } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { c_is, extractError, extractParam, not } from '@lib/templating-api/utilities';

const comparators = {
  '>': (param: () => any, error: Error) => (
    c_is(not(V_LTE), param, (value: any) => isOneType(value, param()) && value > param(), error)
  ),

  '>=': (param: () => any, error: Error) => (
    c_is(V_GTE, param, (value: any) => isOneType(value, param()) && value >= param(), error)
  ),

  '<': (param: () => any, error: Error) => (
    c_is(not(V_GTE), param, (value: any) => isOneType(value, param()) && value < param(), error)
  ),

  '<=': (param: () => any, error: Error) => (
    c_is(V_LTE, param, (value: any) => isOneType(value, param()) && value <= param(), error)
  ),

  '=': (param: () => any, error: Error) => (
    c_is(V_EQ, param, (value: any) => value === param(), error)
  ),

  '!=': (param: () => any, error: Error) => (
    c_is(not(V_EQ), param, (value: any) => value !== param(), error)
  ),

  '%': (param: () => any, error: Error) => (
    c_is(V_MLP, param, (value: any) => isNumber(value) && isNumber(param()) && value % param() === 0, error)
  ),

  '!%': (param: () => any, error: Error) => (
    c_is(not(V_MLP), param, (value: any) => isNumber(value) && isNumber(param()) && value % param() !== 0, error)
  ),

  '->': (param: () => Array<any>, error: Error) => (
    c_is(V_OOF, param, (value: any) => (isArray(param()) || isString(param())) && param().indexOf(value) >= 0, error)
  ),

  '!->': (param: () => Array<any>, error: Error) => (
    c_is(not(V_OOF), param, (value: any) => (isArray(param()) || isString(param())) && param().indexOf(value) < 0, error)
  ),
};

export const compareBuilder = (meta: CompilerMeta, { params: [comparator, ...params], error }: ValidatorData) => {
  const calleeParam = extractParam(meta, params);

  const valueMapper = (
    calleeParam.callee
      ? (value: any) => () => calleeParam.callee(value)
      : (value: any) => () => value
  );

  return (
    calleeParam.code === REF.code
      ? getDep(calleeParam.value, (value: any) =>
        isDefined(value) && comparators[comparator.value](valueMapper(value))
      )
      : comparators[comparator.value](calleeParam, extractError(meta, error))
  );
};