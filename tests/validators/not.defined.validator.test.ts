import { V_DEF as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { defined as validator } from '@lib/validators/defined';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.not(),
      [
        undefined
      ],
      [
        '', null,
        1.5, -1.5, 0.01, NaN, Infinity,
        '1', '-1', '1.5', 'abc', '1e3',
        true, false,
        emptyObject(),
        emptyFunction(),
        emptyArray()
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.not(notNullError()),
      [[undefined], [0]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.not(errorMetaCase([], [], invertError(VALIDATOR_NAME, true))),
      [[0]],
      emptyMeta()
    );
  });
});