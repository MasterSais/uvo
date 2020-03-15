import { transform as validator } from '@lib/groupers/transform';
import { G_TRM as VALIDATOR_NAME } from '@lib/names';
import { clamp } from '@lib/processors/clamp';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyObject, paramsCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [],
        [emptyFunction()],
        [emptyFunction(), emptyFunction()],
        [(value: any) => value + 1]
      ],
      [
        [emptyObject()],
        [emptyArray()],
        [1],
        ['1'],
        [false],
        [Infinity],
        [NaN],
        [null],
        [undefined]
      ],
      VALIDATOR_NAME
    );
  });

  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[clamp(0, 5)], -1, 0],
        [[clamp(-100, 100), clamp(-10, 0), clamp(2, 8)], 300, 2],
        [[(value: any) => value + 1], 10, 11]
      ],
      []
    );
  });
});