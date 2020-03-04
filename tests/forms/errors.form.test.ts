import { withErrors } from '@lib/containers/with-errors';
import { gte } from '@lib/validators/gte';
import { integer } from '@lib/validators/integer';
import { minLen } from '@lib/validators/min-len';
import { notEmpty } from '@lib/validators/notEmpty';
import { number } from '@lib/validators/number';
import { object } from '@lib/validators/object';
import { string } from '@lib/validators/string';
import { parallel } from '@lib/groupers/parallel';

test('errors', () => {
  const validator = (
    withErrors(
      object({
        id: [
          notEmpty('Empty id'),
          number('Not a number'),
          gte(0, 'Must not be negative'),
          integer('Must be an integer')
        ],
        name: [
          notEmpty('Empty name'),
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
          notEmpty('Empty id'),
          number('Not a number'),
          parallel(
            gte(0, 'Must not be negative'),
            integer('Must be an integer')
          )
        ],
        name: [
          notEmpty('Empty name'),
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