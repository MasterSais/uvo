import { consecutive } from '@lib/base-api/groupers/consecutive';
import { array } from '@lib/base-api/validators/array';
import { gte } from '@lib/base-api/validators/is';
import { number } from '@lib/base-api/validators/number';
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

// describe('processor injection form › template', () => {
//   baseCasesWithParams(() => (
//     template(`
//       @array(@number : @compare(>=0)) : $0
//     `)([
//       (data: Array<number>) => data.filter(value => !!value)
//     ])
//   ), cases, []);
// });