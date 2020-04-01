import { CompilerMeta, ValidatorData } from './types';
import { arrayBuilder } from './validators/array';
import { boolBuilder } from './validators/bool';
import { compareBuilder } from './validators/compare';
import { dateBuilder } from './validators/date';
import { lengthBuilder } from './validators/length';
import { numberBuilder } from './validators/number';
import { objectBuilder } from './validators/object';
import { stringBuilder } from './validators/string';

export const validatorBase = new Map<string, any>();

const setValidator = (name: string, shortName: string, builder: ((meta: CompilerMeta, data: ValidatorData) => any)) => (
  validatorBase.set(name, builder),
  validatorBase.set(shortName, builder)
);

setValidator('number', 'n', numberBuilder);

setValidator('date', 'd', dateBuilder);

setValidator('string', 's', stringBuilder);

setValidator('bool', 'b', boolBuilder);

setValidator('object', 'o', objectBuilder);

setValidator('array', 'a', arrayBuilder);

setValidator('compare', 'c', compareBuilder);

setValidator('length', 'l', lengthBuilder);