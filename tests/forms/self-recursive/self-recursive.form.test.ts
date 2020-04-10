import { withMeta } from '@lib/classic-api/containers/with-meta';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setVDep } from '@lib/classic-api/spreaders/set-v-dep';
import { gte } from '@lib/classic-api/validators/is';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { template, tml } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('self-recursive form', () => {
  baseCasesWithParams(() => (
    withMeta(
      setVDep('node',
        object({
          id: [number(), gte(0)],
          node: getDep('node', validators => validators)
        })
      )
    )
  ), cases, []);
});

describe('self-recursive form › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      setVDep('node',
        object2([
          ['id', number(), gte(0)],
          ['node', getDep('node', validators => validators)]
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