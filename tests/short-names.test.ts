import { wrr } from '@lib/containers/with-errors';
import { prl } from '@lib/groupers/parallel';
import { gte } from '@lib/validators/gte';
import { int } from '@lib/validators/integer';
import { mnl } from '@lib/validators/min-len';
import { nem } from '@lib/validators/not-empty';
import { num } from '@lib/validators/number';
import { ob2 } from '@lib/validators/object2';
import { str } from '@lib/validators/string';

test('errors parallel 2', () => {
  const validator = (
    wrr(
      ob2([
        ['id',
          nem('Empty id'),
          num('Not a number'),
          prl(
            gte(0, 'Must not be negative'),
            int('Must be an integer')
          )
        ],
        ['name',
          nem('Empty name'),
          str(),
          mnl(10, 'Min length is 10')
        ]
      ])
    )
  );

  expect(
    validator({ id: 1, name: 'AwesomeName' })
  ).toEqual({
    result: { id: 1, name: 'AwesomeName' },
    errors: null
  });

  expect(
    validator({ name: 'AwesomeName' })
  ).toEqual({
    result: { id: null, name: 'AwesomeName' },
    errors: [
      'Empty id'
    ]
  });

  expect(
    validator({ id: -10, name: 'AwesomeName' })
  ).toEqual({
    result: { id: null, name: 'AwesomeName' },
    errors: [
      'Must not be negative'
    ]
  });

  expect(
    validator({ id: -10.5, name: 'AwesomeName' })
  ).toEqual({
    result: { id: null, name: 'AwesomeName' },
    errors: [
      'Must not be negative',
      'Must be an integer'
    ]
  });
});