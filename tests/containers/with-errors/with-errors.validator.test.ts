import { withErrors as validator } from '@lib/classic-api/containers/with-errors';
import { withMeta } from '@lib/classic-api/containers/with-meta';
import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { parallel } from '@lib/classic-api/groupers/parallel';
import { C_ERR as VALIDATOR_NAME } from '@lib/classic-api/names';
import { MetaData } from '@lib/classic-api/types';
import { gte } from '@lib/classic-api/validators/is';
import { integer } from '@lib/classic-api/validators/multiple';
import { number } from '@lib/classic-api/validators/number';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases1, cases2 } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
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