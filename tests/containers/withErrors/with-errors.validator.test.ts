import { withErrors as validator } from '@lib/containers/with-errors';
import { consecutive } from '@lib/groupers/consecutive';
import { parallel } from '@lib/groupers/parallel';
import { C_ERR as VALIDATOR_NAME } from '@lib/names';
import { template } from '@lib/template/template';
import { gte } from '@lib/validators/is';
import { integer } from '@lib/validators/multiple';
import { number } from '@lib/validators/number';
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
});