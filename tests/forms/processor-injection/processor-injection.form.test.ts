import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { array } from '@lib/classic-api/validators/array';
import { gte } from '@lib/classic-api/validators/is';
import { number } from '@lib/classic-api/validators/number';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('processor injection form', () => {
  baseCasesWithParams(() => (
    consecutive(
      array([
        number(),
        gte(0)
      ]),
      (data: Array<number>) => data.filter(value => !!value)
    )
  ), cases, []);
});

describe('processor injection form › template', () => {
  baseCasesWithParams(() => (
    template(`
      @array(@number : @compare(>=0)) : $0
    `)([
      (data: Array<number>) => data.filter(value => !!value)
    ])
  ), cases, []);
});