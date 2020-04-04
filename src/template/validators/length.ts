import { isLengthy } from '@lib/utilities';
import { Lengthy } from '../../types';
import { is } from '../../validators/is';
import { CompilerMeta, ValidatorData } from '../types';
import { extractParam } from './utilities';

const lengthComparators = {
  '>': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length > param()),
  '>=': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length >= param()),
  '<': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length < param()),
  '<=': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length <= param()),
  '=': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length === param()),
  '!=': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length !== param()),
  '%': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length % param() === 0),
  '!%': (param: () => any) => is((value: Lengthy) => isLengthy(value) && value.length % param() !== 0)
};

export const lengthBuilder = (meta: CompilerMeta, { params: [comparator, ...params] }: ValidatorData) =>
  lengthComparators[comparator.value](extractParam(meta, params));