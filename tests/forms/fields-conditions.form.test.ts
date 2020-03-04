import { consecutive } from '@lib/groupers/consecutive';
import { fields } from '@lib/validators/fields';
import { gte } from '@lib/validators/gte';
import { len } from '@lib/validators/len';
import { minLen } from '@lib/validators/min-len';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { object2 } from '@lib/validators/object2';
import { string } from '@lib/validators/string';

test('fields conditions', () => {
  const validator = (
    consecutive(
      fields(['&', ['^', 'id', 'guid'], 'login']),
      object({
        id: [number(), gte(0)],
        guid: [string(), len(36)],
        login: [string(), minLen(10)]
      })
    )
  );

  expect(
    validator({ id: 3, guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' })
  ).toEqual(null);

  expect(
    validator({ id: 3, login: 'AwesomeLogin' })
  ).toEqual({ id: 3, guid: null, login: 'AwesomeLogin' });

  expect(
    validator({ id: 3, login: 'BadLogin' })
  ).toEqual({ id: 3, guid: null, login: null });

  expect(
    validator({ guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' })
  ).toEqual({ id: null, guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' });

  expect(
    validator({ guid: '00000000-0000-0000-0000-000000000000', login: 'BadLogin' })
  ).toEqual({ id: null, guid: '00000000-0000-0000-0000-000000000000', login: null });

  expect(
    validator({ login: 'AwesomeLogin' })
  ).toEqual(null);
});

test('fields conditions 2', () => {
  const validator = (
    consecutive(
      fields(['&', ['^', 'id', 'guid'], 'login']),
      object2([
        ['id', number(), gte(0)],
        ['guid', string(), len(36)],
        ['login', string(), minLen(10)]
      ])
    )
  );

  expect(
    validator({ id: 3, guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' })
  ).toEqual(null);

  expect(
    validator({ id: 3, login: 'AwesomeLogin' })
  ).toEqual({ id: 3, guid: null, login: 'AwesomeLogin' });

  expect(
    validator({ id: 3, login: 'BadLogin' })
  ).toEqual({ id: 3, guid: null, login: null });

  expect(
    validator({ guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' })
  ).toEqual({ id: null, guid: '00000000-0000-0000-0000-000000000000', login: 'AwesomeLogin' });

  expect(
    validator({ guid: '00000000-0000-0000-0000-000000000000', login: 'BadLogin' })
  ).toEqual({ id: null, guid: '00000000-0000-0000-0000-000000000000', login: null });

  expect(
    validator({ login: 'AwesomeLogin' })
  ).toEqual(null);
});