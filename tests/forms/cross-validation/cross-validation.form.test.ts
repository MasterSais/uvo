import { withMeta } from '@lib/base-api/containers/with-meta';
import { getRef } from '@lib/base-api/spreaders/get-ref';
import { setRef } from '@lib/base-api/spreaders/set-ref';
import { date } from '@lib/base-api/validators/date';
import { gte, lte } from '@lib/base-api/validators/is';
import { number } from '@lib/base-api/validators/number';
import { object2 } from '@lib/base-api/validators/object2';
import { compile } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases, cases2 } from './cases';

describe('cross validation form › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      object2([
        ['a', date(), lte.not(1000), setRef()],
        ['b', date(), getRef('a', a => a && gte(a + 1000)), setRef('b')],
        ['c', date(), getRef('b', b => b && gte(b))]
      ])
    )
  ), cases, []);
});

describe('cross validation form › compile', () => {
  baseCasesWithParams(() => (
    compile(`
      @object(
        a : @date : @compare(>$now) : #a,
        b : @date : @compare(>=$plusOne(#a)) : #b,
        c : @date : @compare(>=#b),
      ) ~meta
    `)({ now: 1000, plusOne: (a: number) => a + 1000 })
  ), cases, []);
});

describe('cross validation form › compile › short', () => {
  baseCasesWithParams(() => (
    compile(`
      @o(
        a @d @c(>$0) #,
        b @d @c(>=$1(#a)) #,
        c @d @c(>=#b)
      ) ~m
    `)([1000, (a: number) => a + 1000])
  ), cases, []);
});

describe('cross validation form 2 › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      object2([
        ['a', number(), setRef('is', 10)],
        ['b', number(), getRef('is', is => is && gte(10))]
      ])
    )
  ), cases2, []);
});

describe('cross validation form 2 › compile', () => {
  baseCasesWithParams(() => (
    compile(`
      @object(
        a : @number : #is(10),
        b : @number : @compare(>=#is)
      ) ~meta
    `)()
  ), cases2, []);
});

describe('cross validation form 2 › compile › short', () => {
  baseCasesWithParams(() => (
    compile(`
      @o(
        a @n #is(10),
        b @n @c(>=#is)
      ) ~m
    `)()
  ), cases2, []);
});