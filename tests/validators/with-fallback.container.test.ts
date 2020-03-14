import { withFallback as validator } from '@lib/containers/with-fallback';
import { C_FLB as VALIDATOR_NAME } from '@lib/names';
import { number } from '@lib/validators/number';
import { emptyFunction, paramsCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [],
        ['fallback'],
        [() => 'fallback'],
        ['fallback', emptyFunction()],
        ['fallback', emptyFunction(), emptyFunction()],
        [() => 'fallback', emptyFunction(), emptyFunction()]
      ],
      [
        ['f1', null],
        ['f1', undefined],
        ['f1', 0],
        ['f1', 1],
        ['f1', {}]
      ],
      VALIDATOR_NAME
    );

    test('base › r_0', () => {
      expect(validator(10, number())(null)).toEqual(10);
    });

    test('base › r_1', () => {
      expect(validator(10, number())(12)).toEqual(12);
    });
  });
});