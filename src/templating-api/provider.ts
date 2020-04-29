import { Validator } from '@lib/base-api/types';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { containerBase, grouperBase, validatorBase } from '@lib/templating-api/validators-base';
import { arrayBuilder } from '@lib/templating-api/validators/array';
import { asyncBuilder } from '@lib/templating-api/validators/async';
import { boolBuilder } from '@lib/templating-api/validators/bool';
import { compareBuilder, lengthBuilder } from '@lib/templating-api/validators/compare';
import { dateBuilder } from '@lib/templating-api/validators/date';
import { consecutiveBuilder, orBuilder, parallelBuilder } from '@lib/templating-api/validators/grouper';
import { numberBuilder } from '@lib/templating-api/validators/number';
import { objectBuilder } from '@lib/templating-api/validators/object';
import { stringBuilder } from '@lib/templating-api/validators/string';
import { waitBuilder } from '@lib/templating-api/validators/wait';
import { errorsBuilder } from '@lib/templating-api/validators/with-errors';
import { metaBuilder } from '@lib/templating-api/validators/with-meta';
import { promiseBuilder } from '@lib/templating-api/validators/with-promise';
import { defaultBuilder, fallbackBuilder } from './validators/default';

export const provider = (base: Map<string, any>) => (validators: Array<[(meta: CompilerMeta, data: ValidatorData) => Validator<any>, Array<string>]>) => (
  validators
    .forEach(([builder, names]) => names
      .forEach(name => base.set(name, builder))
    )
);

provider(validatorBase)([
  [numberBuilder, ['number', 'n']],
  [dateBuilder, ['date', 'd']],
  [stringBuilder, ['string', 's']],
  [boolBuilder, ['bool', 'b']],
  [objectBuilder, ['object', 'o']],
  [arrayBuilder, ['array', 'a']],
  [compareBuilder, ['compare', 'c']],
  [lengthBuilder, ['length', 'l']],
  [asyncBuilder, ['async', 'p']],
  [waitBuilder, ['wait', 'w']],
  [fallbackBuilder, ['fallback', 'f']],
  [defaultBuilder, ['default']]
]);

provider(containerBase)([
  [errorsBuilder, ['error', 'e']],
  [metaBuilder, ['meta', 'm']],
  [promiseBuilder, ['promise', 'p']]
]);

provider(grouperBase)([
  [consecutiveBuilder, ['(']],
  [orBuilder, ['[']],
  [parallelBuilder, ['{']]
]);