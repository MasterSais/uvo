import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { S_DYN as VALIDATOR_NAME } from '@lib/classic-api/names';
import { dynamic as validator } from '@lib/classic-api/spreaders/dynamic';
import { equal, gte } from '@lib/classic-api/validators/is';
import { number } from '@lib/classic-api/validators/number';
import { template } from '@lib/templating-api/template';
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

  test('base › template', () => {
    expect(
      template(`
        @object(
          id : @number : $0
        )
      `)([gte(0)])({ id: -1 })
    ).toEqual({ id: null });
  });
});