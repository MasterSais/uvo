import { V_EQ as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { defined, equal as validator } from '@lib/validators/equal';
import { baseCases, baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator.not,
      [
        [[1], 0],
        [[1], 'abc'],
        [[1], true, true],
        [[1], emptyObject()],
        [[1], NaN],
        [[1], Infinity],
        [[1], null],
        [[1], undefined],
        [['abc'], 1],
        [['abc'], ''],
        [['abc'], true],
        [['abc'], emptyObject()],
        [['abc'], NaN],
        [['abc'], Infinity],
        [['abc'], undefined],
        [[true], false],
        [[true], 1],
        [[{}], emptyObject()]
      ],
      [
        [[1], 1],
        [['abc'], 'abc'],
        [['abc'], null],
        [[true], true],
        [[emptyObject()], emptyObject()]
      ]
    );
  });

  describe('base › defined', () => {
    baseCases<any>(
      defined(),
      [
        1, 'abc', true, null,
        emptyObject(), emptyArray(), emptyFunction()
      ],
      [
        undefined
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator.not(1, notNullError()),
      [[0], [1]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[1]],
      emptyMeta()
    );
  });

  describe('with error › defined', () => {
    withErrorCases<any>(
      defined(notNullError()),
      [[1], [undefined]]
    );
  });

  describe('with meta › defined', () => {
    withErrorCases<any>(
      defined(errorMetaCase([], [undefined], invertError(VALIDATOR_NAME, true))),
      [[undefined]],
      emptyMeta()
    );
  });
});