import { withErrors as validator } from '@lib/base-api/containers/with-errors';
import { withMeta } from '@lib/base-api/containers/with-meta';
import { integer } from '@lib/base-api/extensions/validators/integer';
import { consecutive } from '@lib/base-api/groupers/consecutive';
import { parallel } from '@lib/base-api/groupers/parallel';
import { C_ERR as VALIDATOR_NAME } from '@lib/base-api/names';
import { MetaData } from '@lib/base-api/types';
import { gte } from '@lib/base-api/validators/is';
import { number } from '@lib/base-api/validators/number';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases1, cases2 } from './cases';

describe(`container › ${VALIDATOR_NAME}`, () => {
  describe('base 1', () =>
    baseCasesWithParams(() => validator(
      consecutive(
        number('E1'),
        gte(0, () => 'E2'),
        integer(() => 'E3')
      )
    ), cases1, [])
  );

  describe('base 2', () =>
    baseCasesWithParams(() => validator(
      consecutive(
        number('E1'),
        parallel(
          gte(0, () => 'E2'),
          integer(() => 'E3')
        )
      )
    ), cases2, [])
  );

  describe('base 1 › template', () =>
    baseCasesWithParams(() => template('@number!e1 : @compare(>=0)!e2 : @compare(%1)!e3 ~e')(
      null,
      { e1: 'E1', e2: () => 'E2', e3: () => 'E3' }
    ), cases1, [])
  );

  test('base › common processor', () =>
    expect(
      withMeta(
        validator(
          number(),
          (_, { validator: vld }) => vld
        )
      )('abc')
    ).toEqual({
      result: null,
      errors: ['number']
    })
  );

  test('base › common processor › template', () =>
    expect(
      template('@number ~e($0) ~m')([
        (_: any, { validator: vld }: MetaData) => vld
      ])('abc')
    ).toEqual({
      result: null,
      errors: ['number']
    })
  );
});