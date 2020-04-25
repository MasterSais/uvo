import { consecutive } from '@lib/base-api/groupers/consecutive';
import { or } from '@lib/base-api/groupers/or';
import { gte } from '@lib/base-api/validators/is';
import { length, minLen } from '@lib/base-api/validators/length';
import { number } from '@lib/base-api/validators/number';
import { object } from '@lib/base-api/validators/object';
import { object2 } from '@lib/base-api/validators/object2';
import { string } from '@lib/base-api/validators/string';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('inline conditions form', () =>
  baseCasesWithParams(() => (
    object({
      id: [or(
        consecutive(number(), gte(0)),
        consecutive(string(), length(36))
      )],
      name: [string(), minLen(10)]
    })
  ), cases, [])
);

describe('inline conditions form › advanced', () =>
  baseCasesWithParams(() => (
    object2([
      ['id', or(
        consecutive(number(), gte(0)),
        consecutive(string(), length(36))
      )],
      ['name', string(), minLen(10)]
    ])
  ), cases, [])
);

describe('inline conditions form › template', () =>
  baseCasesWithParams(() => (
    template(`
      @object(
        id : <[ 
          <( @number : @compare(>=0) )>
          <( @string : @length(=36) )> 
        ]>,
        name : @string : @length(>=10)
      )
  `)()
  ), cases, [])
);