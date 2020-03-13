import { V_STR as VALIDATOR_NAME } from '@lib/names';
import { string as validator } from '@lib/validators/string';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.check(),
      [
        '', '2', 'abc',
        0, 2.2, -1.2, NaN, Infinity,
        true, false
      ],
      [
        null, undefined,
        emptyObject(),
        emptyFunction(),
        emptyArray()
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.check(notNullError()),
      [['0'], [null]],
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