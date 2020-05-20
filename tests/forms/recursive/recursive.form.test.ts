import { withMeta } from '@lib/base-api/containers/with-meta';
import { getRef } from '@lib/base-api/spreaders/get-ref';
import { setVRef } from '@lib/base-api/spreaders/set-v-ref';
import { gte } from '@lib/base-api/validators/is';
import { number } from '@lib/base-api/validators/number';
import { object } from '@lib/base-api/validators/object';
import { object2 } from '@lib/base-api/validators/object2';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('recursive form', () => {
  baseCasesWithParams(() => (
    withMeta(
      object({
        id: [number(), gte(0)],
        node: setVRef('node',
          object({
            id: [number(), gte(0)],
            node: getRef('node', validators => validators)
          })
        )
      })
    )
  ), cases, []);
});

describe('recursive form › advanced', () => {
  baseCasesWithParams(() => (
    withMeta(
      object2([
        ['id', number(), gte(0)],
        ['node', setVRef('node',
          object2([
            ['id', number(), gte(0)],
            ['node', getRef('node', validators => validators)]
          ])
        )]
      ])
    )
  ), cases, []);
});

// describe('recursive form › template', () => {
//   baseCasesWithParams(() => (
//     template(`
//       @object(
//         id : @number : @compare(>=0),
//         node : #node(
//           @object(
//             id : @number : @compare(>=0),
//             node : ##node
//           )
//         )
//       ) ~meta
//     `)()
//   ), cases, []);
// });

// describe('recursive form › template › short', () => {
//   baseCasesWithParams(() => (
//     tml`
//       @o(
//         id @n @c(>=0),
//         node #0(
//           @o(
//             id @n @c(>=0),
//             node : ##0
//           )
//         )
//       ) ~m
//     `()
//   ), cases, []);
// });