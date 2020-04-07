import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { fields } from '@lib/classic-api/validators/fields';
import { gte } from '@lib/classic-api/validators/is';
import { length, minLen } from '@lib/classic-api/validators/length';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { string } from '@lib/classic-api/validators/string';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('fields conditions form', () => {
  baseCasesWithParams(() => (
    consecutive(
      fields(['&', ['^', 'id', 'guid'], 'login']),
      object({
        id: [number(), gte(0)],
        guid: [string(), length(36)],
        login: [string(), minLen(10)]
      })
    )
  ), cases, []);
});

describe('fields conditions form › advanced', () => {
  baseCasesWithParams(() => (
    consecutive(
      fields(['&', ['^', 'id', 'guid'], 'login']),
      object2([
        ['id', number(), gte(0)],
        ['guid', string(), length(36)],
        ['login', string(), minLen(10)]
      ])
    )
  ), cases, []);
});