import { CompilerMeta, ValidatorData } from './types';
import { arrayBuilder } from './validators/array';
import { boolBuilder } from './validators/bool';
import { compareBuilder } from './validators/compare';
import { dateBuilder } from './validators/date';
import { lengthBuilder } from './validators/length';
import { numberBuilder } from './validators/number';
import { objectBuilder } from './validators/object';
import { stringBuilder } from './validators/string';
import { errorsBuilder } from './validators/with-errors';
import { metaBuilder } from './validators/with-meta';
import { promiseBuilder } from './validators/with-promise';

export const validatorBase = new Map<string, any>();

export const containerBase = new Map<string, any>();

const set = (base: Map<string, any>) => (name: string, shortName: string, builder: ((meta: CompilerMeta, data: ValidatorData) => any)) => (
  base.set(name, builder),
  base.set(shortName, builder)
);

const setValidator = set(validatorBase);

const setContainer = set(containerBase);

setValidator('number', 'n', numberBuilder);

setValidator('date', 'd', dateBuilder);

setValidator('string', 's', stringBuilder);

setValidator('bool', 'b', boolBuilder);

setValidator('object', 'o', objectBuilder);

setValidator('array', 'a', arrayBuilder);

setValidator('compare', 'c', compareBuilder);

setValidator('length', 'l', lengthBuilder);

setContainer('error', 'e', errorsBuilder);

setContainer('meta', 'm', metaBuilder);

setContainer('promise', 'p', promiseBuilder);