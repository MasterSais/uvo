import { V_REG as VALIDATOR_NAME } from '@lib/names';
import { regex as validator } from '@lib/validators/regex';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
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
      validator.not(/a|1|true/, errorMetaCase([], [/a|1|true/], VALIDATOR_NAME)),
      [[1]],
      emptyMeta()
    );
  });
});