import { withErrors } from '@lib/base-api/containers/with-errors';
import { withMeta } from '@lib/base-api/containers/with-meta';
import { getRef } from '@lib/base-api/spreaders/get-ref';
import { setVRef } from '@lib/base-api/spreaders/set-v-ref';
import { ValidatorError, MetaData } from '@lib/base-api/types';
import { array } from '@lib/base-api/validators/array';
import { gte } from '@lib/base-api/validators/is';
import { minLen } from '@lib/base-api/validators/length';
import { number } from '@lib/base-api/validators/number';
import { object2 } from '@lib/base-api/validators/object2';
import { string } from '@lib/base-api/validators/string';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('common error processing', () => {
  baseCasesWithParams(() => (
    withMeta(
      withErrors(
        setVRef(
          'user',
          object2([
            ['id', number('numberErr'), gte(0, 'gteErr')],
            ['name', string('stringErr'), minLen(3, 'minLenErr')],
            ['roles', array(number('numberErr'), 'arrayErr')],
            ['subs', array(getRef('user', v => v), 'arrayErr')]
          ], 'objectErr')
        ), (error, { validator, path }) => `${validator}:${path.join('.')}:${error}`
      )
    )
  ), cases, []);
});

// describe('common error processing › template', () => {
//   baseCasesWithParams(() => (
//     template(`
//       #user(
//         @object(
//           id : @number!0 : @compare(>=0)!1,
//           name : @string!2 : @length(>=3)!3,
//           roles : @array( @number!0 )!4,
//           subs : @array(##user)!4
//         )!5
//       ) ~error($0) ~meta
//     `)(
//       [
//         (error: ValidatorError, { validator, path }: MetaData) => `${validator}:${path.join('.')}:${error}`
//       ],
//       [
//         'numberErr', 'gteErr', 'stringErr', 'minLenErr', 'arrayErr', 'objectErr'
//       ]
//     )
//   ), cases, []);
// });

// describe('common error processing › template › short', () => {
//   baseCasesWithParams(() => (
//     template(`
//       #0(
//         @o(
//           id @n!0 @c(>=0)!1,
//           name @s!2 @l(>=3)!3,
//           roles @a( @n!0 )!4,
//           subs @a( ##0 )!4
//         )!5
//       ) ~e($0) ~m
//     `)(
//       [
//         (error: ValidatorError, { validator, path }: MetaData) => `${validator}:${path.join('.')}:${error}`
//       ],
//       [
//         'numberErr', 'gteErr', 'stringErr', 'minLenErr', 'arrayErr', 'objectErr'
//       ]
//     )
//   ), cases, []);
// });