import { V_IS as VALIDATOR_NAME } from '@lib/names';
import { equal as validator } from '@lib/validators/is';
import { baseCasesWithParams, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[1], 1],
        [[Infinity], Infinity],
        [[null], null],
        [['abc'], 'abc'],
        [[true], true],
        [[emptyObject()], emptyObject()]
      ],
      [
        [[1], 0],
        [[1], 'abc'],
        [[1], true],
        [[1], emptyObject()],
        [[1], NaN],
        [[1], Infinity],
        [[1], null],
        [[1], undefined],
        [[NaN], NaN],
        [['abc'], 1],
        [['abc'], ''],
        [['abc'], true],
        [['abc'], emptyObject()],
        [['abc'], NaN],
        [['abc'], Infinity],
        [['abc'], null],
        [['abc'], undefined],
        [[true], false],
        [[true], 1],
        [[{}], emptyObject()]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(1, notNullError()),
      [[1], [0]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(1, errorMetaCase([], [1], VALIDATOR_NAME)),
      [[0]],
      emptyMeta()
    );
  });
});