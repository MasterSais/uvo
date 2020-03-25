import { consecutive } from '@lib/groupers/consecutive';
import { S_DYN as VALIDATOR_NAME } from '@lib/names';
import { dynamic as validator } from '@lib/spreaders/dynamic';
import { equal, gte } from '@lib/validators/is';
import { number } from '@lib/validators/number';
import { emptyFunction, paramsCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [emptyFunction()]
      ],
      [
        [''],
        [],
        [null]
      ],
      VALIDATOR_NAME
    );
  });

  test('base › r_0', () => {
    expect(
      consecutive(
        number(),
        validator(() => equal(10))
      )(10)
    ).toEqual(10);
  });

  test('base › r_1', () => {
    expect(
      consecutive(
        number(),
        validator(() => gte(10))
      )(10)
    ).toEqual(10);
  });

  test('base › w_0', () => {
    expect(
      consecutive(
        number(),
        validator(() => equal.not(10))
      )(10)
    ).toEqual(null);
  });
});