import { V_DTE as VALIDATOR_NAME } from '@lib/names';
import { date as validator } from '@lib/validators/date';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[], 0, 0],
        [[], '12.12.2020', 1607720400000],
        [[], [12, 12, 2020], 1607720400000],
        [[], new Date(1666000), 1666000]
      ],
      [
        [[], null],
        [[], 'abc'],
        [[], undefined],
        [[], NaN],
        [[], Infinity],
        [[], emptyArray()],
        [[], emptyFunction()],
        [[], emptyObject()]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator(notNullError()),
      [[0, 0], [null]],
      null
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });
});