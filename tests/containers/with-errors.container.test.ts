import { withErrors } from '@lib/containers/with-errors';
import { consecutive } from '@lib/groupers/consecutive';
import { parallel } from '@lib/groupers/parallel';
import { C_ERR as VALIDATOR_NAME } from '@lib/names';
import { gte, integer } from '@lib/validators/is';
import { number } from '@lib/validators/number';
import { baseCasesWithParams } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  const params1 = (
    consecutive(
      number('E1'),
      gte(0, () => 'E2'),
      integer(() => 'E3')
    )
  );

  baseCasesWithParams<any>(
    withErrors,
    [
      [[params1], 12, { result: 12, errors: null }],
      [[params1], 'abc', { result: null, errors: ['E1'] }],
      [[params1], -1, { result: null, errors: ['E2'] }],
      [[params1], 2.2, { result: null, errors: ['E3'] }]
    ],
    []
  );

  const params2 = (
    consecutive(
      number('E1'),
      parallel(
        gte(0, () => 'E2'),
        integer(() => 'E3')
      )
    )
  );

  baseCasesWithParams<any>(
    withErrors,
    [
      [[params2], 12, { result: 12, errors: null }],
      [[params2], 'abc', { result: null, errors: ['E1'] }],
      [[params2], -1, { result: null, errors: ['E2'] }],
      [[params2], 2.2, { result: null, errors: ['E3'] }],
      [[params2], -2.2, { result: null, errors: ['E2', 'E3'] }]
    ],
    []
  );
});