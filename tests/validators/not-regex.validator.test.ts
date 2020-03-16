import { V_REG as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { regex as validator } from '@lib/validators/is';
import { baseCases, emptyFunction, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.not(/^(a|1|true)$/),
      [
        0, 11, Infinity, NaN,
        'abc',
        false,
        {},
        emptyFunction(),
        [],
        null, undefined
      ],
      [
        1, true, 'a'
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator.not(/a|1|true/, notNullError()),
      [[0], [1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator.not(/a|1|true/, errorMetaCase([], [/a|1|true/], invertError(VALIDATOR_NAME, true))),
      [[1]],
      emptyMeta()
    );
  });
});