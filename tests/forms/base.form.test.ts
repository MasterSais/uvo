import { gte } from '@lib/classic-api/validators/is';
import { minLen } from '@lib/classic-api/validators/length';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { string } from '@lib/classic-api/validators/string';

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