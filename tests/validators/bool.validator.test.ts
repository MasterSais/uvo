import { V_BLN as VALIDATOR_NAME } from '@lib/names';
import { bool as validator } from '@lib/validators/bool';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[], 1, true],
        [[], 0, false],
        [[], 'true', true],
        [[], 'false', false],
        [[], '1', true],
        [[], '0', false],
        [[], true, true],
        [[], false, false]
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
      validator(notNullError()),
      [[0, false], [null]],
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