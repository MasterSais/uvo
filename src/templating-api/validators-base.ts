import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { arrayBuilder } from '@lib/templating-api/validators/array';
import { boolBuilder } from '@lib/templating-api/validators/bool';
import { compareBuilder } from '@lib/templating-api/validators/compare';
import { dateBuilder } from '@lib/templating-api/validators/date';
import { lengthBuilder } from '@lib/templating-api/validators/length';
import { numberBuilder } from '@lib/templating-api/validators/number';
import { objectBuilder } from '@lib/templating-api/validators/object';
import { stringBuilder } from '@lib/templating-api/validators/string';
import { errorsBuilder } from '@lib/templating-api/validators/with-errors';
import { metaBuilder } from '@lib/templating-api/validators/with-meta';
import { promiseBuilder } from '@lib/templating-api/validators/with-promise';

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