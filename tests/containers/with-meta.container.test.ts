import { withErrors } from '@lib/containers/with-errors';
import { withMeta } from '@lib/containers/with-meta';
import { consecutive } from '@lib/groupers/consecutive';
import { parallel } from '@lib/groupers/parallel';
import { C_MET as VALIDATOR_NAME } from '@lib/names';
import { gte } from '@lib/validators/gte';
import { integer } from '@lib/validators/multiple';
import { number } from '@lib/validators/number';
import { baseCasesWithParams } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  const params1 = (
    withErrors(
      consecutive(
        number(({ validator }) => validator),
        gte(0, ({ validator }) => validator),
        integer(({ validator }) => validator)
      )
    )
  );

  baseCasesWithParams<any>(
    withMeta,
    [
      [[params1], 12, { result: 12, errors: null }],
      [[params1], 'abc', { result: null, errors: ['number'] }],
      [[params1], -1, { result: null, errors: ['gte'] }],
      [[params1], 2.2, { result: null, errors: ['multiple'] }]
    ],
    []
  );

  const params2 = (
    withErrors(
      consecutive(
        number(({ validator }) => validator),
        parallel(
          gte(0, ({ validator }) => validator),
          integer(({ validator }) => validator)
        )
      )
    )
  );

  baseCasesWithParams<any>(
    withMeta,
    [
      [[params2], 12, { result: 12, errors: null }],
      [[params2], 'abc', { result: null, errors: ['number'] }],
      [[params2], -1, { result: null, errors: ['gte'] }],
      [[params2], 2.2, { result: null, errors: ['multiple'] }],
      [[params2], -2.2, { result: null, errors: ['gte', 'multiple'] }]
    ],
    []
  );
});