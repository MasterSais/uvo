import { V_BLN as VALIDATOR_NAME } from '@lib/names';
import { bool as validator } from '@lib/validators/bool';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator.check,
      [
        [[], true],
        [[], false],
        [[], 1],
        [[], 0],
        [[], 'true'],
        [[], 'false'],
        [[], '1'],
        [[], '0']
      ],
      [
        [[], null],
        [[], '10.2'],
        [[], '-10.2'],
        [[], undefined],
        [[], NaN],
        [[], Infinity],
        [[], emptyArray()],
        [[], [1, 2, 3]],
        [[], emptyFunction()],
        [[], emptyObject()]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.check(notNullError()),
      [[false], [null]],
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