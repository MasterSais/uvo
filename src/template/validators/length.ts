import { isLengthy } from '@lib/utilities';
import { Lengthy } from '../../types';
import { is } from '../../validators/is';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError, extractParam } from './utilities';

const lengthComparators = {
  '>': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length > param(), error)
  ),

  '>=': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length >= param(), error)
  ),

  '<': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length < param(), error)
  ),

  '<=': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length <= param(), error)
  ),

  '=': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length === param(), error)
  ),

  '!=': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length !== param(), error)
  ),

  '%': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length % param() === 0, error)
  ),

  '!%': (param: () => any, error: Error) => (
    is((value: Lengthy) => isLengthy(value) && value.length % param() !== 0, error)
  )
};

export const lengthBuilder = (meta: CompilerMeta, { params: [comparator, ...params], error }: ValidatorData) =>
  lengthComparators[comparator.value](extractParam(meta, params), extractError(meta, error));