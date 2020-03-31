import { getDep } from '../spreaders/get-dep';
import { setDep } from '../spreaders/set-dep';
import { Lengthy } from '../types';
import { callee } from '../utilities';
import { array } from '../validators/array';
import { bool } from '../validators/bool';
import { date } from '../validators/date';
import { is } from '../validators/is';
import { number } from '../validators/number';
import { object2 } from '../validators/object2';
import { string } from '../validators/string';
import { LFB, SQ } from './lexemes';
import { VALIDATOR_ENTRY_LEXEME } from './semantic-analyzer';
import { CompilerMeta, LexemeScheme, ValidatorData, ValidatorWithParams } from './types';

const startsWithLexeme = (param: string, lexeme: LexemeScheme) => param[0] === lexeme.literals[0];

const extractStringParam = (param: string) => (
  startsWithLexeme(param, SQ) && (param = param.slice(1, -1)) && (() => param)
);

const extractParam = (meta: CompilerMeta, param: string) => (
  (
    startsWithLexeme(param, LFB) && (param = param.slice(1, -1)) && (() => callee(meta.injections[param])())
  ) ||
  (
    extractStringParam(param)
  ) ||
  (
    !isNaN(+param) && (() => +param)
  ) ||
  null
);

const validatorBase = new Map<string, any>([
  ['date', () => date()],
  ['number', () => number()],
  ['string', () => string()],
  ['bool', () => bool()]
]);

export const getValidator = (meta: CompilerMeta, data: ValidatorData) => {
  const validator = validatorBase.get((data as ValidatorWithParams).name || data as string);

  if (!validator) {
    throw `Unsupported validator name '${(data as ValidatorWithParams).name || data}'`;
  }

  return validator(meta, (data as ValidatorWithParams).params);
};

validatorBase.set('object', (meta: CompilerMeta, params: Array<any>) => {
  const fields = [];

  for (let i = 0; i < params.length; i++) {
    if (params[i] === VALIDATOR_ENTRY_LEXEME) {
      fields.push([params[++i]]);
    } else {
      fields[fields.length - 1].push(getValidator(meta, params[i]));
    }
  }

  return object2(fields as any);
});

validatorBase.set('dep', (_meta: CompilerMeta, [param]: Array<any>) =>
  setDep(extractStringParam(param)())
);

const comparators = {
  '>': (param: () => any) => is((value: any) => value > param()),
  '>=': (param: () => any) => is((value: any) => value >= param()),
  '<': (param: () => any) => is((value: any) => value < param()),
  '<=': (param: () => any) => is((value: any) => value <= param()),
  '=': (param: () => any) => is((value: any) => value === param()),
  '!=': (param: () => any) => is((value: any) => value !== param()),
  '%': (param: () => any) => is((value: any) => value % param() === 0),
  '!%': (param: () => any) => is((value: any) => value % param() !== 0)
};

validatorBase.set('compare', (meta: CompilerMeta, [comparator, param]: Array<any>) => {
  const extracted = extractParam(meta, param);

  if (!extracted) {
    return getDep(param, (value: any) => value !== undefined && comparators[comparator](() => value));
  }

  return comparators[comparator](extractParam(meta, param));
});

const lengthComparators = {
  '>': (param: () => any) => is(({ length }: Lengthy) => length > param()),
  '>=': (param: () => any) => is(({ length }: Lengthy) => length >= param()),
  '<': (param: () => any) => is(({ length }: Lengthy) => length < param()),
  '<=': (param: () => any) => is(({ length }: Lengthy) => length <= param()),
  '=': (param: () => any) => is(({ length }: Lengthy) => length === param()),
  '!=': (param: () => any) => is(({ length }: Lengthy) => length !== param()),
  '%': (param: () => any) => is(({ length }: Lengthy) => length % param() === 0),
  '!%': (param: () => any) => is(({ length }: Lengthy) => length % param() !== 0)
};

validatorBase.set('length', (meta: CompilerMeta, [comparator, param]: Array<any>) =>
  lengthComparators[comparator](extractParam(meta, param))
);

validatorBase.set('array', (meta: CompilerMeta, params: Array<any>) => {
  const validators = [];

  for (let i = 1; i < params.length; i++) {
    validators.push(getValidator(meta, params[i]));
  }

  return array(validators);
});