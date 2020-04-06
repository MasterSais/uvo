import { V_EQ, V_GTE, V_LTE, V_MLP } from '../../names';
import { getDep } from '../../spreaders/get-dep';
import { Error } from '../../types';
import { isDefined, isNumber, isOneType } from '../../utilities';
import { REF } from '../lexemes';
import { CompilerMeta, ValidatorData } from '../types';
import { c_is, extractError, extractParam, not } from './utilities';

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
  )
};

export const compareBuilder = (meta: CompilerMeta, { params: [comparator, ...params], error }: ValidatorData) => {
  const calleeParam = extractParam(meta, params);

  return (
    calleeParam.code === REF.code
      ? getDep(calleeParam.value, (value: any) => isDefined(value) && comparators[comparator.value](() => value))
      : comparators[comparator.value](calleeParam, extractError(meta, error))
  );
};