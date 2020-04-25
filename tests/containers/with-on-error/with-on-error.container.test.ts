import { withOnError } from '@lib/base-api/containers/with-on-error';
import { parallel } from '@lib/base-api/groupers/parallel';
import { C_OER as VALIDATOR_NAME } from '@lib/base-api/names';
import { gte } from '@lib/base-api/validators/is';
import { integer } from '@lib/base-api/validators/multiple';
import { number } from '@lib/base-api/validators/number';

test(`container › ${VALIDATOR_NAME}`, () => {
  let errors: Array<any> = [];

  const callback = (error: any) => errors.push(error);

  const simpleOne = (
    withOnError(
      callback,
      number('E1'),
      parallel(
        gte(0, () => 'E2'),
        integer(() => 'E3')
      )
    )
  );

  expect(simpleOne(12)).toEqual(12);

  expect(errors).toEqual([]);

  errors = [];

  expect(simpleOne('abc')).toEqual(null);

  expect(errors).toEqual(['E1']);

  errors = [];

  expect(simpleOne(-1)).toEqual(null);

  expect(errors).toEqual(['E2']);

  errors = [];

  expect(simpleOne(2.2)).toEqual(null);

  expect(errors).toEqual(['E3']);

  errors = [];

  expect(simpleOne(-2.2)).toEqual(null);

  expect(errors).toEqual(['E2', 'E3']);
});