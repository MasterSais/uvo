import { withErrors } from '@lib/classic-api/containers/with-errors';
import { parallel } from '@lib/classic-api/groupers/parallel';
import { empty, gte } from '@lib/classic-api/validators/is';
import { minLen } from '@lib/classic-api/validators/length';
import { integer } from '@lib/classic-api/validators/multiple';
import { number } from '@lib/classic-api/validators/number';
import { object } from '@lib/classic-api/validators/object';
import { object2 } from '@lib/classic-api/validators/object2';
import { string } from '@lib/classic-api/validators/string';

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