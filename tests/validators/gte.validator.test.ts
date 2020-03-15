import { V_IS as VALIDATOR_NAME } from '@lib/names';
import { gte as validator } from '@lib/validators/is';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, GTE_COMPARATOR_STR, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[0], 0],
        [[0], 1],
        [[0], Infinity],
        [['b'], 'b'],
        [['b'], 'c'],
        [[true], true],
        [[Date.now()], Date.now() + 1000],
        [[Date.now()], new Date(Date.now() + 1000)],
        [[new Date()], new Date(Date.now() + 1000)]
      ],
      [
        [[0], -1],
        [[0], -Infinity],
        // [[0], '1'],
        // [[0], true],
        [[0], emptyObject()],
        [[0], emptyFunction()],
        // [[0], emptyArray()],
        [[0], NaN],
        [[0], undefined],
        [['b'], 'a'],
        // [['0'], 10],
        // [['0'], true],
        // [['0'], emptyObject()],
        [['0'], emptyFunction()],
        [['0'], emptyArray()],
        [['0'], NaN],
        [['0'], undefined],
        [[true], false],
        [[Date.now()], Date.now() - 1000],
        [[Date.now()], new Date(Date.now() - 1000)],
        [[new Date()], new Date(Date.now() - 1000)]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(0, notNullError()),
      [[1], [-1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(0, errorMetaCase([], [GTE_COMPARATOR_STR], VALIDATOR_NAME)),
      [[-1]],
      emptyMeta()
    );
  });
});