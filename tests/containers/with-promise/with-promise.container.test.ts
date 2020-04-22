import { withErrors } from '@lib/classic-api/containers/with-errors';
import { withMeta } from '@lib/classic-api/containers/with-meta';
import { withPromise } from '@lib/classic-api/containers/with-promise';
import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { parallel } from '@lib/classic-api/groupers/parallel';
import { C_PRM as VALIDATOR_NAME } from '@lib/classic-api/names';
import { gte } from '@lib/classic-api/validators/is';
import { integer } from '@lib/classic-api/validators/multiple';
import { number } from '@lib/classic-api/validators/number';
import { asyncCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`container › ${VALIDATOR_NAME}`, () => {
  asyncCases(
    withPromise(
      withErrors(
        withMeta(
          consecutive(
            number(({ validator }) => validator),
            parallel(
              gte(0, ({ validator }) => validator),
              integer(({ validator }) => validator)
            )
          )
        )
      )
    ), right, wrong
  )
});