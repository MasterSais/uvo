import { or as validator } from '@lib/groupers/or';
import { G_OR as VALIDATOR_NAME, V_IS, V_MLP } from '@lib/names';
import { gte, integer } from '@lib/validators/is';
import { number } from '@lib/validators/number';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [],
        [emptyFunction()],
        [emptyFunction(), emptyFunction()]
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
        [[number()], 0],
        [[number()], '1', 1],
        [[integer(), gte(0)], 3],
        [[integer(), gte(0)], -1],
        [[integer(), gte(0)], 1.1]
      ],
      [
        [[number()], 'abc'],
        [[number()], 'abc'],
        [[integer(), gte(0)], -1.1]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(integer(notNullError()), gte(0, notNullError())),
      [[0], [-1.1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(integer(errorMetaCase([], [1], V_MLP)), gte(0, errorMetaCase([], [0], V_IS))),
      [[-1.1]],
      emptyMeta()
    );
  });
});