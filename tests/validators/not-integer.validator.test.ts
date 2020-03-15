import { V_MLP as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { integer as validator } from '@lib/validators/multiple';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.not(),
      [
        1.5, -1.5, 0.01, NaN, Infinity,
        '1', '-1', '1.5', 'abc', '1e3',
        true, false,
        null, undefined,
        emptyObject(),
        emptyFunction(),
        emptyArray()
      ],
      [
        0, -0, 1, -1, 1e3, -1e3, 0.00
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.not(notNullError()),
      [[null], [0]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.not(errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[0]],
      emptyMeta()
    );
  });
});