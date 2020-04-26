import { withErrors } from '@lib/base-api/containers/with-errors';
import { withMeta } from '@lib/base-api/containers/with-meta';
import { withPromise } from '@lib/base-api/containers/with-promise';
import { consecutive } from '@lib/base-api/groupers/consecutive';
import { parallel } from '@lib/base-api/groupers/parallel';
import { C_PRM as VALIDATOR_NAME } from '@lib/base-api/names';
import { gte } from '@lib/base-api/validators/is';
import { integer } from '@lib/base-api/validators/multiple';
import { number } from '@lib/base-api/validators/number';
import { asyncCases } from '@test/utilities';
import { cases } from './cases';

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
    ), cases
  )
});