import { withErrors } from '@lib/classic-api/containers/with-errors';
import { parallel } from '@lib/classic-api/groupers/parallel';
import { empty, gte } from '@lib/classic-api/validators/is';
import { minLen } from '@lib/classic-api/validators/length';
import { integer } from '@lib/classic-api/validators/multiple';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { string } from '@lib/classic-api/validators/string';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases1, cases2 } from './cases';

describe('errors form', () =>
  baseCasesWithParams(() => (
    withErrors(
      object({
        id: [
          empty.not('Empty id'),
          number('Not a number'),
          gte(0, 'Must not be negative'),
          integer('Must be an integer')
        ],
        name: [
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
        ]
      })
    )
  ), cases1, [])
);

describe('errors form › advanced', () =>
  baseCasesWithParams(() => (
    withErrors(
      object2([
        ['id',
          empty.not('Empty id'),
          number('Not a number'),
          gte(0, 'Must not be negative'),
          integer('Must be an integer')
        ],
        ['name',
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
        ]
      ])
    )
  ), cases1, [])
);

describe('errors form › template', () =>
  baseCasesWithParams(() => (
    template(`
      @object(
        id : @compare(!=undefined)!0 : @number!1 : @compare(>=0)!2 : @compare(%1)!3,
        name : @compare(!=undefined)!4 : @string : @length(>=10)!5
      ) ~error
    `)(null, ['Empty id', 'Not a number', 'Must not be negative', 'Must be an integer', 'Empty name', 'Min length is 10'])
  ), cases1, [])
);

describe('errors form › template › short', () =>
  baseCasesWithParams(() => (
    template(`
      @o(
        id @c(!=null)!0 @n!1 @c(>=0)!2 @c(%1)!3,
        name @c(!=$0)!4 @s @l(>=10)!5
      ) ~e
    `)([null], ['Empty id', 'Not a number', 'Must not be negative', 'Must be an integer', 'Empty name', 'Min length is 10'])
  ), [cases1[0]], [])
);

describe('errors parallel form', () =>
  baseCasesWithParams(() => (
    withErrors(
      object({
        id: [
          empty.not('Empty id'),
          number('Not a number'),
          parallel(
            gte(0, 'Must not be negative'),
            integer('Must be an integer')
          )
        ],
        name: [
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
        ]
      })
    )
  ), cases2, [])
);

describe('errors parallel form › advanced', () =>
  baseCasesWithParams(() => (
    withErrors(
      object2([
        ['id',
          empty.not('Empty id'),
          number('Not a number'),
          parallel(
            gte(0, 'Must not be negative'),
            integer('Must be an integer')
          )
        ],
        ['name',
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
        ]
      ])
    )
  ), cases2, [])
);

describe('errors parallel form › template', () =>
  baseCasesWithParams(() => (
    template(`
      @object(
        id : @compare(!=undefined)!0 : @number!1 : <{ @compare(>=0)!2 : @compare(%1)!3 }>,
        name : @compare(!=undefined)!4 : @string : @length(>=10)!5
      ) ~error
    `)(null, ['Empty id', 'Not a number', 'Must not be negative', 'Must be an integer', 'Empty name', 'Min length is 10'])
  ), cases2, [])
);