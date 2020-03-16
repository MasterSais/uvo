import { V_MLP as VALIDATOR_NAME } from '@lib/names';
import { integer, multiple as validator } from '@lib/validators/is';
import { baseCases, baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

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

  describe('base › integer', () => {
    baseCases<any>(
      integer(),
      [
        0, -0, 1, -1
      ],
      [
        1.5, -1.5, 0.01
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

  describe('with error › integer', () => {
    withErrorCases(
      integer(notNullError()),
      [[0], [null]]
    );
  });

  describe('with meta › integer', () => {
    withErrorCases(
      integer(errorMetaCase([], [1], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });
});