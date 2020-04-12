import { withMeta } from '@lib/classic-api/containers/with-meta';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setDep } from '@lib/classic-api/spreaders/set-dep';
import { gte } from '@lib/classic-api/validators/is';
import { minLen } from '@lib/classic-api/validators/length';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { string } from '@lib/classic-api/validators/string';
import { template, tml } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('conditions form', () => {
  baseCasesWithParams(() => (
    withMeta(
      object({
        id: [number(), gte(0), setDep('isIdValid', true)],
        name: [getDep(
          'isIdValid',
          (isIdValue: boolean) => isIdValue && [string(), minLen(10)]
        )]
      })
    )
  ), cases, []);
});

describe('conditions form › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      object2([
        ['id', number(), gte(0), setDep('isIdValid', true)],
        ['name', getDep(
          'isIdValid',
          (isIdValue: boolean) => isIdValue && [string(), minLen(10)]
        )]
      ])
    )
  ), cases, []);
});

describe('conditions form › template', () => {
  baseCasesWithParams(() => (
    template(`
      @object(
        id : @number : @compare(>=0) : #isIdValid(true),
        name : $0(#isIdValid) ? <( @string : @length(>=10) )>
      ) ~meta
    `)([(isIdValue: boolean) => isIdValue === true])
  ), cases, []);
});

describe('conditions form › template › short', () => {
  baseCasesWithParams(() => (
    tml`
      @o(
        id $0 ? @n @c(>=0) #0,
        name #0 ? <( @s @l(>=10) )>
      ) ~m
    `([true])
  ), cases, []);
});