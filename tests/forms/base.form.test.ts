import { gte } from '@lib/validators/gte';
import { minLen } from '@lib/validators/min-len';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { object2 } from '@lib/validators/object2';
import { string } from '@lib/validators/string';

test('base form', () => {
  const validator = (
    object({
      id: [number(), gte(0)],
      name: [string(), minLen(10)]
    })
  );

  expect(
    validator({ id: 3, name: 'YourAwesomeUserName' })
  ).toEqual({ id: 3, name: 'YourAwesomeUserName' });

  expect(
    validator({ id: -1, name: 'YourAwesomeUserName' })
  ).toEqual({ id: null, name: 'YourAwesomeUserName' });

  expect(
    validator({ id: 3, name: 'ShortName' })
  ).toEqual({ id: 3, name: null });

  expect(
    validator({ id: 'ff', name: 'ShortName' })
  ).toEqual({ id: null, name: null });
});

test('base form 2', () => {
  const validator = (
    object2([
      ['id', number(), gte(0)],
      ['name', string(), minLen(10)]
    ])
  );

  expect(
    validator({ id: 3, name: 'YourAwesomeUserName' })
  ).toEqual({ id: 3, name: 'YourAwesomeUserName' });

  expect(
    validator({ id: -1, name: 'YourAwesomeUserName' })
  ).toEqual({ id: null, name: 'YourAwesomeUserName' });

  expect(
    validator({ id: 3, name: 'ShortName' })
  ).toEqual({ id: 3, name: null });

  expect(
    validator({ id: 'ff', name: 'ShortName' })
  ).toEqual({ id: null, name: null });
});