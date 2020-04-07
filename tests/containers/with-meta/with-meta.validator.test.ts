import { withErrors } from '@lib/classic-api/containers/with-errors';
import { withMeta as validator } from '@lib/classic-api/containers/with-meta';
import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { parallel } from '@lib/classic-api/groupers/parallel';
import { C_MET as VALIDATOR_NAME } from '@lib/classic-api/names';
import { template } from '@lib/templating-api/template';
import { gte } from '@lib/classic-api/validators/is';
import { integer } from '@lib/classic-api/validators/multiple';
import { number } from '@lib/classic-api/validators/number';
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