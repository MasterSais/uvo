import { withMeta } from '@lib/classic-api/containers/with-meta';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setDep } from '@lib/classic-api/spreaders/set-dep';
import { date } from '@lib/classic-api/validators/date';
import { gte, lte } from '@lib/classic-api/validators/is';
import { object2 } from '@lib/classic-api/validators/object2';
import { template, tml } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('cross validation form › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      object2([
        ['a', date(), lte.not(1000), setDep('a')],
        ['b', date(), getDep('a', a => a && gte(a)), setDep('b')],
        ['c', date(), getDep('b', b => b && gte(b))]
      ])
    )
  ), cases, []);
});

describe('cross validation form › template', () => {
  baseCasesWithParams(() => (
    template(`
      @object(
        a : @date : @compare(>$now) : #a,
        b : @date : @compare(>=#a) : #b,
        c : @date : @compare(>=#b)
      ) ~meta
    `)({ now: 1000 })
  ), cases, []);
});

describe('cross validation form › template › short', () => {
  baseCasesWithParams(() => (
    tml`
      @o(
        a @d @c(>$0) #a,
        b @d @c(>=#a) #b,
        c @d @c(>=#b)
      ) ~m
    `([1000])
  ), cases, []);
});