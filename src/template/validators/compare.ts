import { getDep } from '../../spreaders/get-dep';
import { Error } from '../../types';
import { isDefined, isNumber, isOneType } from '../../utilities';
import { is } from '../../validators/is';
import { REF } from '../lexemes';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError, extractParam } from './utilities';

const comparators = {
  '>': (param: () => any, error: Error) => (
    is((value: any) => isOneType(value, param()) && value > param(), error)
  ),

  '>=': (param: () => any, error: Error) => (
    is((value: any) => isOneType(value, param()) && value >= param(), error)
  ),

  '<': (param: () => any, error: Error) => (
    is((value: any) => isOneType(value, param()) && value < param(), error)
  ),

  '<=': (param: () => any, error: Error) => (
    is((value: any) => isOneType(value, param()) && value <= param(), error)
  ),

  '=': (param: () => any, error: Error) => (
    is((value: any) => value === param(), error)
  ),

  '!=': (param: () => any, error: Error) => (
    is((value: any) => value !== param(), error)
  ),

  '%': (param: () => any, error: Error) => (
    is((value: any) => isNumber(value) && isNumber(param()) && value % param() === 0, error)
  ),

  '!%': (param: () => any, error: Error) => (
    is((value: any) => isNumber(value) && isNumber(param()) && value % param() !== 0, error)
  )
};

export const compareBuilder = (meta: CompilerMeta, { params: [comparator, ...params], error }: ValidatorData) => {
  const calleeParam = extractParam(meta, params);

  if (calleeParam.code === REF.code) {
    return getDep(calleeParam.value, (value: any) => isDefined(value) && comparators[comparator.value](() => value));
  }

  return comparators[comparator.value](calleeParam, extractError(meta, error));
};