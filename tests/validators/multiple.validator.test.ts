import { V_MLP as VALIDATOR_NAME } from '@lib/names';
import { multiple as validator } from '@lib/validators/multiple';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[1], 1, 1],
        [[2], 2, 2]
      ],
      [
        [[1], 1.2],
        [[2], 3],
        [[2], '2'],
        [[2], false],
        [[2], null],
        [[2], Infinity],
        [[2], -Infinity],
        [[2], NaN],
        [[2], undefined],
        [[2], emptyFunction()],
        [[2], emptyArray()],
        [[2], emptyObject()]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator(1, notNullError()),
      [[0], [null]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(1, errorMetaCase([], [1], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });

  describe('with error › not', () => {
    withErrorCases(
      validator.not(1, notNullError()),
      [[null], [0]]
    );
  });

  describe('with meta › not', () => {
    withErrorCases(
      validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[0]],
      emptyMeta()
    );
  });
});