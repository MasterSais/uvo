import { getDep } from '../../spreaders/get-dep';
import { isDefined, isNumber, isOneType } from '../../utilities';
import { is } from '../../validators/is';
import { REF } from '../lexemes';
import { CompilerMeta, ValidatorData } from '../types';
import { extractParam } from './utilities';

const comparators = {
  '>': (param: () => any) => is((value: any) => isOneType(value, param()) && value > param()),
  '>=': (param: () => any) => is((value: any) => isOneType(value, param()) && value >= param()),
  '<': (param: () => any) => is((value: any) => isOneType(value, param()) && value < param()),
  '<=': (param: () => any) => is((value: any) => isOneType(value, param()) && value <= param()),
  '=': (param: () => any) => is((value: any) => value === param()),
  '!=': (param: () => any) => is((value: any) => value !== param()),
  '%': (param: () => any) => is((value: any) => isNumber(value) && isNumber(param()) && value % param() === 0),
  '!%': (param: () => any) => is((value: any) => isNumber(value) && isNumber(param()) && value % param() !== 0)
};

export const compareBuilder = (meta: CompilerMeta, { params: [comparator, ...params] }: ValidatorData) => {
  const calleeParam = extractParam(meta, params);

  if (calleeParam.code === REF.code) {
    return getDep(calleeParam.value, (value: any) => isDefined(value) && comparators[comparator.value](() => value));
  }

  return comparators[comparator.value](calleeParam);
};