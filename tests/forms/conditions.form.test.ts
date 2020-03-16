import { withMeta } from '@lib/containers/with-meta';
import { getDep } from '@lib/spreaders/get-dep';
import { setDep } from '@lib/spreaders/set-dep';
import { gte } from '@lib/validators/is';
import { minLen } from '@lib/validators/length';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { object2 } from '@lib/validators/object2';
import { string } from '@lib/validators/string';

test('conditions', () => {
  const validator = (
    withMeta(
      object({
        id: [number(), gte(0), setDep('isIdValid', true)],
        name: [getDep(
          'isIdValid',
          (isIdValue: boolean) => isIdValue && [string(), minLen(10)]
        )]
      })
    )
  );

  expect(
    validator({ id: 3, name: 'AwesomeLogin' })
  ).toEqual({ id: 3, name: 'AwesomeLogin' });

  expect(
    validator({ id: 3, name: 'BadLogin' })
  ).toEqual({ id: 3, name: null });

  expect(
    validator({ id: -2, name: 'BadLogin' })
  ).toEqual({ id: null, name: 'BadLogin' });
});

test('conditions 2', () => {
  const validator = (
    withMeta(
      object2([
        ['id', number(), gte(0), setDep('isIdValid', true)],
        ['name', getDep(
          'isIdValid',
          (isIdValue: boolean) => isIdValue && [string(), minLen(10)]
        )]
      ])
    )
  );

  expect(
    validator({ id: 3, name: 'AwesomeLogin' })
  ).toEqual({ id: 3, name: 'AwesomeLogin' });

  expect(
    validator({ id: 3, name: 'BadLogin' })
  ).toEqual({ id: 3, name: null });

  expect(
    validator({ id: -2, name: 'BadLogin' })
  ).toEqual({ id: null, name: 'BadLogin' });
});