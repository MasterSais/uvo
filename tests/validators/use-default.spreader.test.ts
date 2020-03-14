import { S_DFT as VALIDATOR_NAME } from '@lib/names';
import { clamp } from '@lib/processors/clamp';
import { useDefault as validator } from '@lib/spreaders/use-default';
import { emptyFunction, paramsCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [],
        ['default'],
        [() => 'default'],
        ['default', emptyFunction()],
        ['default', emptyFunction(), emptyFunction()],
        [() => 'default', emptyFunction(), emptyFunction()]
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
      expect(validator('default', emptyFunction())(null)).toEqual('default');
    });

    test('base › r_1', () => {
      expect(validator(5, clamp(0, 10))(15)).toEqual(10);
    });

    test('base › r_2', () => {
      expect(validator(5, clamp(0, 10))(undefined)).toEqual(5);
    });
  });
});