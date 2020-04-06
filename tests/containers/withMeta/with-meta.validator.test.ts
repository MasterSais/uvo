import { withErrors } from '@lib/containers/with-errors';
import { withMeta as validator } from '@lib/containers/with-meta';
import { consecutive } from '@lib/groupers/consecutive';
import { parallel } from '@lib/groupers/parallel';
import { C_MET as VALIDATOR_NAME } from '@lib/names';
import { template } from '@lib/template/template';
import { gte } from '@lib/validators/is';
import { integer } from '@lib/validators/multiple';
import { number } from '@lib/validators/number';
import { baseCasesWithParams } from '@test/utilities';
import { cases1, cases2, templateCases1 } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base 1', () =>
    baseCasesWithParams(() => validator(
      withErrors(
        consecutive(
          number(({ validator }) => validator),
          gte(0, ({ validator }) => validator),
          integer(({ validator }) => validator)
        )
      )
    ), cases1, [])
  );

  describe('base 2', () =>
    baseCasesWithParams(() => validator(
      withErrors(
        consecutive(
          number(({ validator }) => validator),
          parallel(
            gte(0, ({ validator }) => validator),
            integer(({ validator }) => validator)
          )
        )
      )
    ), cases2, [])
  );

  describe('base 1 › template', () =>
    baseCasesWithParams(() => template('@number!err : @compare(>=0)!err : @compare(%1)!err ~e ~m')(
      null,
      { err: ({ validator }) => validator }
    ), templateCases1, [])
  );
});