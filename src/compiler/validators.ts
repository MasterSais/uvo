import { array } from '../validators/array';
import { bool } from '../validators/bool';
import { date } from '../validators/date';
import { is } from '../validators/is';
import { number } from '../validators/number';
import { object2 } from '../validators/object2';
import { string } from '../validators/string';
import { VALIDATOR_ENTRY_LEXEME } from './semantic-analyzer';
import { CompilerMeta, ValidatorData, ValidatorWithParams } from './types';

const validatorBase = new Map<string, any>([
  ['date', date],
  ['number', number],
  ['string', string],
  ['bool', bool]
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

const comparators = {
  '>': (param: any) => is((value: any) => value > param()),
  '>=': (param: any) => is((value: any) => value >= param()),
  '<': (param: any) => is((value: any) => value < param()),
  '<=': (param: any) => is((value: any) => value <= param()),
  '=': (param: any) => is((value: any) => value === param()),
  '!=': (param: any) => is((value: any) => value !== param()),
  '%': (param: any) => is((value: any) => value % param() === 0),
  '!%': (param: any) => is((value: any) => value % param() !== 0)
};

validatorBase.set('compare', (meta: CompilerMeta, [comparator, param]: Array<any>) =>
  comparators[comparator](() => meta.injection ? null : param)
);

const lengthComparators = {
  '>': (param: any) => is((value: any) => value.length > param),
  '>=': (param: any) => is((value: any) => value.length >= param),
  '<': (param: any) => is((value: any) => value.length < param),
  '<=': (param: any) => is((value: any) => value.length <= param),
  '=': (param: any) => is((value: any) => value.length === param),
  '!=': (param: any) => is((value: any) => value.length !== param),
  '%': (param: any) => is((value: any) => value.length % param === 0),
  '!%': (param: any) => is((value: any) => value.length % param !== 0)
};

validatorBase.set('length', (meta: CompilerMeta, [comparator, param]: Array<any>) =>
  lengthComparators[comparator](param)
);

validatorBase.set('array', (meta: CompilerMeta, params: Array<any>) => {
  const validators = [];

  for (let i = 0; i < params.length; i++) {
    if (params[i] !== VALIDATOR_ENTRY_LEXEME) {
      validators.push(getValidator(meta, params[i]));
    }
  }

  return array(validators);
});

validatorBase.set('defined', null);

validatorBase.set('not-empty', null);

validatorBase.set('regex', null);

validatorBase.set('one-of', null);

validatorBase.set('fields', null);

validatorBase.set('default', null);

validatorBase.set('clamp', null);

validatorBase.set('erase', null);

validatorBase.set('keys-map', null);

validatorBase.set('value-map', null);

validatorBase.set('to-lower', null);

validatorBase.set('to-upper', null);

validatorBase.set('round', null);

validatorBase.set('strip', null);

validatorBase.set('trim', null);

validatorBase.set('or', null);

validatorBase.set('parallel', null);