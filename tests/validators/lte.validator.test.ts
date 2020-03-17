import { V_LTE as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { lte as validator } from '@lib/validators/is';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[0], 0],
        [[0], -1],
        [[0], -Infinity],
        [['b'], 'b'],
        [['b'], 'a'],
        [[false], false],
        [[Date.now()], Date.now() - 1000],
        [[new Date()], new Date(Date.now() - 1000)]
      ],
      [
        [[0], 1],
        [[0], Infinity],
        [[1], '1'],
        [[1], false],
        [[0], emptyObject()],
        [[0], emptyFunction()],
        [[0], emptyArray()],
        [[0], NaN],
        [[0], undefined],
        [['b'], 'c'],
        [['1'], 0],
        [['1'], false],
        [['0'], emptyObject()],
        [['0'], emptyFunction()],
        [['0'], emptyArray()],
        [['0'], NaN],
        [['0'], undefined],
        [[false], true],
        [[Date.now()], Date.now() + 1000],
        [[Date.now()], new Date(Date.now() + 1000)],
        [[new Date()], new Date(Date.now() + 1000)]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(0, notNullError()),
      [[-1], [1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(0, errorMetaCase([], [0], VALIDATOR_NAME)),
      [[1]],
      emptyMeta()
    );
  });

  describe('with error › not', () => {
    withErrorCases<any>(
      validator.not(0, notNullError()),
      [[1], [-1]]
    );
  });

  describe('with meta › not', () => {
    withErrorCases<any>(
      validator.not(0, errorMetaCase([], [0], invertError(VALIDATOR_NAME, true))),
      [[-1]],
      emptyMeta()
    );
  });
});