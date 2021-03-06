import { withMeta } from '@lib/base-api/containers/with-meta';
import { getRef } from '@lib/base-api/spreaders/get-ref';
import { setVRef } from '@lib/base-api/spreaders/set-v-ref';
import { gte } from '@lib/base-api/validators/is';
import { number } from '@lib/base-api/validators/number';
import { object } from '@lib/base-api/validators/object';
import { object2 } from '@lib/base-api/validators/object2';
import { template, tml } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('self-recursive form', () => {
  baseCasesWithParams(() => (
    withMeta(
      setVRef('node',
        object({
          id: [number(), gte(0)],
          node: getRef('node', validators => validators)
        })
      )
    )
  ), cases, []);
});

describe('self-recursive form › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      setVRef('node',
        object2([
          ['id', number(), gte(0)],
          ['node', getRef('node', validators => validators)]
        ])
      )
    )
  ), cases, []);
});

describe('self-recursive form › template', () => {
  baseCasesWithParams(() => (
    template(`
      #node(
        @object(
          id : @number : @compare(>=0),
          node : ##node
        )
      ) ~meta
    `)()
  ), cases, []);
});

describe('self-recursive form › template › short', () => {
  baseCasesWithParams(() => (
    tml`
      #0(
        @o(
          id @n @c(>=0),
          node ##0
        )
      ) ~m
    `()
  ), cases, []);
});