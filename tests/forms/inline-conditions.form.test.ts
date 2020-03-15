import { consecutive } from '@lib/groupers/consecutive';
import { or } from '@lib/groupers/or';
import { gte } from '@lib/validators/gte';
import { length } from '@lib/validators/length';
import { minLen } from '@lib/validators/length';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { object2 } from '@lib/validators/object2';
import { string } from '@lib/validators/string';

test('inline conditions', () => {
  const validator = (
    object({
      id: [or(
        consecutive(number(), gte(0)),
        consecutive(string(), length(36))
      )],
      name: [string(), minLen(10)]
    })
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
    object2([
      ['id', or(
        consecutive(number(), gte(0)),
        consecutive(string(), length(36))
      )],
      ['name', string(), minLen(10)]
    ])
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