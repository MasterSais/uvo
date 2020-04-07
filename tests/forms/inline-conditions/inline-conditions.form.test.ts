import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { or } from '@lib/classic-api/groupers/or';
import { gte } from '@lib/classic-api/validators/is';
import { length, minLen } from '@lib/classic-api/validators/length';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { string } from '@lib/classic-api/validators/string';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('inline conditions form', () => {
  baseCasesWithParams(() => (
    object({
      id: [or(
        consecutive(number(), gte(0)),
        consecutive(string(), length(36))
      )],
      name: [string(), minLen(10)]
    })
  ), cases, []);
});

describe('inline conditions form › advanced', () => {
  baseCasesWithParams(() => (
    object2([
      ['id', or(
        consecutive(number(), gte(0)),
        consecutive(string(), length(36))
      )],
      ['name', string(), minLen(10)]
    ])
  ), cases, []);
});