import { withMeta } from '@lib/containers/with-meta';
import { consecutive } from '@lib/groupers/consecutive';
import { or } from '@lib/groupers/or';
import { gte } from '@lib/validators/gte';
import { len } from '@lib/validators/len';
import { minLen } from '@lib/validators/min-len';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { object2 } from '@lib/validators/object2';
import { string } from '@lib/validators/string';

test('inline conditions', () => {
  const validator = (
    withMeta(
      object({
        id: [or(
          consecutive(number(), gte(0)),
          consecutive(string(), len(36))
        )],
        name: [string(), minLen(10)]
      })
    )
  );

  expect(
    validator({ id: 3, name: 'AwesomeLogin' })
  ).toEqual({ id: 3, name: 'AwesomeLogin' });

  expect(
    validator({ id: '00000000-0000-0000-0000-000000000000', name: 'AwesomeLogin' })
  ).toEqual({ id: '00000000-0000-0000-0000-000000000000', name: 'AwesomeLogin' });

  expect(
    validator({ id: '00000000-0000', name: 'AwesomeLogin' })
  ).toEqual({ id: null, name: 'AwesomeLogin' });

  expect(
    validator({ id: -1, name: 'AwesomeLogin' })
  ).toEqual({ id: null, name: 'AwesomeLogin' });
});

test('inline conditions 2', () => {
  const validator = (
    withMeta(
      object2([
        ['id', or(
          consecutive(number(), gte(0)),
          consecutive(string(), len(36))
        )],
        ['name', string(), minLen(10)]
      ])
    )
  );

  expect(
    validator({ id: 3, name: 'AwesomeLogin' })
  ).toEqual({ id: 3, name: 'AwesomeLogin' });

  expect(
    validator({ id: '00000000-0000-0000-0000-000000000000', name: 'AwesomeLogin' })
  ).toEqual({ id: '00000000-0000-0000-0000-000000000000', name: 'AwesomeLogin' });

  expect(
    validator({ id: '00000000-0000', name: 'AwesomeLogin' })
  ).toEqual({ id: null, name: 'AwesomeLogin' });

  expect(
    validator({ id: -1, name: 'AwesomeLogin' })
  ).toEqual({ id: null, name: 'AwesomeLogin' });
});