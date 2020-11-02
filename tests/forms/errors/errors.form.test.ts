import { array, or } from '@lib/base-api';
import { withErrors } from '@lib/base-api/containers/with-errors';
import { integer } from '@lib/base-api/extensions/validators/integer';
import { parallel } from '@lib/base-api/groupers/parallel';
import { defined, empty, gte } from '@lib/base-api/validators/is';
import { minLen } from '@lib/base-api/validators/length';
import { number } from '@lib/base-api/validators/number';
import { object } from '@lib/base-api/validators/object';
import { object2 } from '@lib/base-api/validators/object2';
import { string } from '@lib/base-api/validators/string';
import { compile } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases1, cases2, cases3, cases4 } from './cases';

describe('or errors form', () =>
  baseCasesWithParams(() => (
    withErrors(
      or(
        array(number('Not a number'))
      )
    )
  ), cases3, [])
);

describe('or errors form 2', () =>
  baseCasesWithParams(() => (
    withErrors(
      or(
        array(number('Not a number')),
        () => undefined
      )
    )
  ), cases4, [])
);

describe('errors form', () =>
  baseCasesWithParams(() => (
    withErrors(
      object({
        id: [
          defined('Empty id'),
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
          defined('Empty id'),
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

describe('errors form › compile', () =>
  baseCasesWithParams(() => (
    compile(`
      @object(
        id : @compare(=def)!0 : @number!1 : @compare(>=0)!2 : @compare(%1)!3,
        name : @compare(!=emp)!4 : @string : @length(>=10)!5
      ) ~error
    `)(null, ['Empty id', 'Not a number', 'Must not be negative', 'Must be an integer', 'Empty name', 'Min length is 10'])
  ), cases1, [])
);

describe('errors form › compile › short', () =>
  baseCasesWithParams(() => (
    compile(`
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
          defined('Empty id'),
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

// describe('errors parallel form › template', () =>
//   baseCasesWithParams(() => (
//     template(`
//       @object(
//         id : @compare(=def)!0 : @number!1 : <{ @compare(>=0)!2 : @compare(%1)!3 }>,
//         name : @compare(!=emp)!4 : @string : @length(>=10)!5
//       ) ~error
//     `)(null, ['Empty id', 'Not a number', 'Must not be negative', 'Must be an integer', 'Empty name', 'Min length is 10'])
//   ), cases2, [])
// );