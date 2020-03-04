import { V_STR as VALIDATOR_NAME } from '@lib/names';
import { string as validator } from '@lib/validators/string';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator(),
      [
        0, 2.2, -1.2, NaN, Infinity,
        '', '2', 'abc',
        true, false
      ],
      [
        null, undefined,
        emptyObject(),
        emptyFunction(),
        emptyArray()
      ],
      String
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator(notNullError()),
      [[0], [null]],
      null,
      String
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta(),
      String
    );
  });
});