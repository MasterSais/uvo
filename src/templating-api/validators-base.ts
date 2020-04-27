import { arrayBuilder } from '@lib/templating-api/validators/array';
import { asyncBuilder } from '@lib/templating-api/validators/async';
import { boolBuilder } from '@lib/templating-api/validators/bool';
import { compareBuilder, lengthBuilder } from '@lib/templating-api/validators/compare';
import { dateBuilder } from '@lib/templating-api/validators/date';
import { consecutiveBuilder, orBuilder, parallelBuilder } from '@lib/templating-api/validators/grouper';
import { numberBuilder } from '@lib/templating-api/validators/number';
import { objectBuilder } from '@lib/templating-api/validators/object';
import { stringBuilder } from '@lib/templating-api/validators/string';
import { uniqueBuilder } from '@lib/templating-api/validators/unique';
import { waitBuilder } from '@lib/templating-api/validators/wait';
import { errorsBuilder } from '@lib/templating-api/validators/with-errors';
import { metaBuilder } from '@lib/templating-api/validators/with-meta';
import { promiseBuilder } from '@lib/templating-api/validators/with-promise';

export const validatorBase: Map<string, any> = new Map<string, any>([
  ['number', numberBuilder],
  ['n', numberBuilder],
  ['date', dateBuilder],
  ['d', dateBuilder],
  ['string', stringBuilder],
  ['s', stringBuilder],
  ['bool', boolBuilder],
  ['b', boolBuilder],
  ['object', objectBuilder],
  ['o', objectBuilder],
  ['array', arrayBuilder],
  ['a', arrayBuilder],
  ['compare', compareBuilder],
  ['c', compareBuilder],
  ['length', lengthBuilder],
  ['l', lengthBuilder],
  ['async', asyncBuilder],
  ['p', asyncBuilder],
  ['wait', waitBuilder],
  ['w', waitBuilder],
  ['unique', uniqueBuilder]
]);

export const containerBase: Map<string, any> = new Map<string, any>([
  ['error', errorsBuilder],
  ['e', errorsBuilder],
  ['meta', metaBuilder],
  ['m', metaBuilder],
  ['promise', promiseBuilder],
  ['p', promiseBuilder]
]);

export const grouperBase: Map<string, any> = new Map<string, any>([
  ['(', consecutiveBuilder],
  ['[', orBuilder],
  ['{', parallelBuilder]
]);