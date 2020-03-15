import { withErrors } from '@lib/containers/with-errors';
import { parallel } from '@lib/groupers/parallel';
import { empty } from '@lib/validators/one-of';
import { gte } from '@lib/validators/is';
import { integer } from '@lib/validators/multiple';
import { minLen } from '@lib/validators/length';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { object2 } from '@lib/validators/object2';
import { string } from '@lib/validators/string';

test('errors', () => {
  const validator = (
    withErrors(
      object({
        id: [
          empty.not('Empty id'),
          number('Not a number'),
          gte(0, 'Must not be negative'),
          integer('Must be an integer')
        ],
        name: [
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
        ]
      })
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
      'Must not be negative'
    ]
  });
});

test('errors parallel', () => {
  const validator = (
    withErrors(
      object({
        id: [
          empty.not('Empty id'),
          number('Not a number'),
          parallel(
            gte(0, 'Must not be negative'),
            integer('Must be an integer')
          )
        ],
        name: [
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
        ]
      })
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

test('errors 2', () => {
  const validator = (
    withErrors(
      object2([
        ['id',
          empty.not('Empty id'),
          number('Not a number'),
          gte(0, 'Must not be negative'),
          integer('Must be an integer')
        ],
        ['name',
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
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
      'Must not be negative'
    ]
  });
});

test('errors parallel 2', () => {
  const validator = (
    withErrors(
      object2([
        ['id',
          empty.not('Empty id'),
          number('Not a number'),
          parallel(
            gte(0, 'Must not be negative'),
            integer('Must be an integer')
          )
        ],
        ['name',
          empty.not('Empty name'),
          string(),
          minLen(10, 'Min length is 10')
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