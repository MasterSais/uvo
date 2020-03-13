import { V_DTE as VALIDATOR_NAME } from '@lib/names';
import { date as validator } from '@lib/validators/date';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME} check`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator.check,
      [
        [[], 0, 0],
        [[], '12.12.2020', '12.12.2020'],
        [[], [12, 12, 2020], [12, 12, 2020]]
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
      validator.check(notNullError()),
      [[0, 0], [null]],
      null
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.check(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });
});