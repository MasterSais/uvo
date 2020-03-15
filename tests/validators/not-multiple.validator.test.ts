import { V_MLP as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { integer, multiple as validator } from '@lib/validators/multiple';
import { baseCases, baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator.not,
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
      ],
      [
        [[1], 1],
        [[2], 2]
      ]
    );
  });

  describe('base › integer', () => {
    baseCases<any>(
      integer.not(),
      [
        1.5, -1.5, 0.01
      ],
      [
        0, -0, 1, -1
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.not(1, notNullError()),
      [[null], [0]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[0]],
      emptyMeta()
    );
  });

  describe('with error › integer', () => {
    withErrorCases(
      integer.not(notNullError()),
      [[null], [0]]
    );
  });

  describe('with meta › integer', () => {
    withErrorCases(
      integer.not(errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[0]],
      emptyMeta()
    );
  });
});