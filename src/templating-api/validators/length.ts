import { V_LEN, V_MNLEN, V_MXLEN } from '@lib/classic-api/names';
import { Lengthy } from '@lib/classic-api/types';
import { isLengthy } from '@lib/classic-api/utilities';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { c_is, extractError, extractParam, not } from '@lib/templating-api/utilities';

const LEN_MLP = 'len-mlp';

const lengthComparators = {
  '>': (param: () => any, error: Error) => (
    c_is(not(V_MXLEN), param, (value: Lengthy) => isLengthy(value) && value.length > param(), error)
  ),

  '>=': (param: () => any, error: Error) => (
    c_is(V_MNLEN, param, (value: Lengthy) => isLengthy(value) && value.length >= param(), error)
  ),

  '<': (param: () => any, error: Error) => (
    c_is(not(V_MNLEN), param, (value: Lengthy) => isLengthy(value) && value.length < param(), error)
  ),

  '<=': (param: () => any, error: Error) => (
    c_is(V_MXLEN, param, (value: Lengthy) => isLengthy(value) && value.length <= param(), error)
  ),

  '=': (param: () => any, error: Error) => (
    c_is(V_LEN, param, (value: Lengthy) => isLengthy(value) && value.length === param(), error)
  ),

  '!=': (param: () => any, error: Error) => (
    c_is(not(V_LEN), param, (value: Lengthy) => isLengthy(value) && value.length !== param(), error)
  ),

  '%': (param: () => any, error: Error) => (
    c_is(LEN_MLP, param, (value: Lengthy) => isLengthy(value) && value.length % param() === 0, error)
  ),

  '!%': (param: () => any, error: Error) => (
    c_is(not(LEN_MLP), param, (value: Lengthy) => isLengthy(value) && value.length % param() !== 0, error)
  )
};

export const lengthBuilder = (meta: CompilerMeta, { params: [comparator, ...params], error }: ValidatorData) => (
  lengthComparators[comparator.value](extractParam(meta, params), extractError(meta, error))
);