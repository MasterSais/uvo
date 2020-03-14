import { V_LEN as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { len as validator } from '@lib/validators/len';
import { baseCases, emptyFunction, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.not(1),
      [
        1, Infinity, NaN,
        'abc',
        true,
        {}, { length: false }, { length: null }, { length: undefined },
        { length: Infinity }, { length: NaN }, { length: '1' }, { length: true },
        emptyFunction(),
        [], [0, 0],
        null, undefined
      ],
      [
        [0], [''], [undefined],
        'a',
        { length: 1 }
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator.not(1, notNullError()),
      [[[]], [[0]]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[[0]]],
      emptyMeta()
    );
  });
});