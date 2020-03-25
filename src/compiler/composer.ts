import { consecutive } from '../groupers/consecutive';
import { array } from '../validators/array';
import { date } from '../validators/date';
import { is } from '../validators/is';
import { number } from '../validators/number';
import { object2 } from '../validators/object2';
import { string } from '../validators/string';
import { VALIDATOR_ENTRY_LEXEME } from './semantic-analyzer';

const validatorBase = new Map();

const getValidator = (data: any) => {
  const validator = validatorBase.get(data.name || data);

  if (!validator) {
    throw `Unsupported validator name '${data.name || data}'`;
  }

  return validator(data.params);
};

validatorBase.set('object', (params: Array<any>) => {
  const fields = [];

  for (let i = 0; i < params.length; i++) {
    if (params[i] === VALIDATOR_ENTRY_LEXEME) {
      fields.push([params[++i]]);
    } else {
      fields[fields.length - 1].push(getValidator(params[i]));
    }
  }

  return object2(fields as any);
});

validatorBase.set('date', date);

const comparators = {
  '>': (param: any) => is((value: any) => value > param),
  '>=': (param: any) => is((value: any) => value >= param),
  '<': (param: any) => is((value: any) => value < param),
  '<=': (param: any) => is((value: any) => value <= param),
  '=': (param: any) => is((value: any) => value === param),
  '!=': (param: any) => is((value: any) => value !== param)
};

validatorBase.set('compare', ([comparator, param]: Array<any>) =>
  comparators[comparator](param)
);

validatorBase.set('number', number);

validatorBase.set('string', string);

const lengthComparators = {
  '>': (param: any) => is((value: any) => value.length > param),
  '>=': (param: any) => is((value: any) => value.length >= param),
  '<': (param: any) => is((value: any) => value.length < param),
  '<=': (param: any) => is((value: any) => value.length <= param),
  '=': (param: any) => is((value: any) => value.length === param),
  '!=': (param: any) => is((value: any) => value.length !== param)
};

validatorBase.set('length', ([comparator, param]: Array<any>) =>
  lengthComparators[comparator](param)
);

validatorBase.set('array', (params: Array<any>) => {
  const validators = [];

  for (let i = 0; i < params.length; i++) {
    if (params[i] !== VALIDATOR_ENTRY_LEXEME) {
      validators.push(getValidator(params[i]));
    }
  }

  return array(validators);
});

export const composer = (semanticTree: Array<any>) => {
  const validators = [];

  for (const node of semanticTree) {
    validators.push(getValidator(node));
  }

  if (validators.length > 1) {
    return consecutive(...validators);
  }

  return validators[0];
};